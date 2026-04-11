import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024;

const createErrorResponse = (message, status) =>
  NextResponse.json(
    {
      success: false,
      message
    },
    { status }
  );

export async function POST(request) {
  const imageBBApiKey = String(
    process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY || ""
  ).trim();

  if (!imageBBApiKey) {
    return createErrorResponse("IMGBB_API_KEY is not configured.", 500);
  }

  let incomingImage;

  try {
    const payload = await request.formData();
    incomingImage = payload.get("image");
  } catch {
    return createErrorResponse("Invalid upload payload.", 400);
  }

  if (!(incomingImage instanceof File) || incomingImage.size === 0) {
    return createErrorResponse("Please provide an image file.", 400);
  }

  if (!incomingImage.type.startsWith("image/")) {
    return createErrorResponse("Only image files are allowed.", 400);
  }

  if (incomingImage.size > MAX_AVATAR_SIZE_BYTES) {
    return createErrorResponse("Image size must be 5MB or smaller.", 400);
  }

  try {
    const buffer = Buffer.from(await incomingImage.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const uploadPayload = new FormData();
    uploadPayload.append("image", base64Image);
    uploadPayload.append("name", String(incomingImage.name || "avatar"));

    const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imageBBApiKey}`, {
      method: "POST",
      body: uploadPayload,
      cache: "no-store"
    });

    const uploadResult = await uploadResponse.json();
    const avatarUrl = String(
      uploadResult?.data?.display_url || uploadResult?.data?.url || uploadResult?.data?.image?.url || ""
    ).trim();

    if (!uploadResponse.ok || !uploadResult?.success || !avatarUrl) {
      return createErrorResponse(
        uploadResult?.error?.message || uploadResult?.message || "Image upload failed.",
        502
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: avatarUrl
      }
    });
  } catch {
    return createErrorResponse("Could not upload image to imageBB.", 502);
  }
}
