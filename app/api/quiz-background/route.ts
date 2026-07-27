export const dynamic = 'force-dynamic';

interface PexelsPhoto {
  src?: {
    large2x?: string;
    large?: string;
  };
}

interface PexelsSearchResponse {
  photos?: PexelsPhoto[];
}

export async function GET(request: Request) {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return Response.json({ imageUrl: null }, { status: 503 });
  }

  try {
    const question = Number(new URL(request.url).searchParams.get('question'));
    const page = Number.isInteger(question) && question >= 0 ? question + 1 : 1;
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=sexy&per_page=1&page=${page}&orientation=portrait`,
      {
        headers: { Authorization: apiKey },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return Response.json({ imageUrl: null }, { status: 502 });
    }

    const data = (await response.json()) as PexelsSearchResponse;
    const imageUrl = data.photos?.[0]?.src?.large2x ?? data.photos?.[0]?.src?.large;

    return Response.json({ imageUrl: imageUrl ?? null });
  } catch {
    return Response.json({ imageUrl: null }, { status: 502 });
  }
}
