export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY?.trim();
  if (!key)
    throw new Error(
      'Image upload is not configured (NEXT_PUBLIC_IMGBB_KEY missing)',
    );

  const form = new FormData();
  form.append('image', file);

  let res: Response;
  try {
    res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: 'POST',
      body: form,
    });
  } catch {
    // network error, ad-blocker, or imgbb unreachable
    throw new Error(
      'Could not reach imgbb. Check your internet, VPN or ad-blocker.',
    );
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.data?.url) {
    console.error('imgbb response:', res.status, json);
    throw new Error(
      json?.error?.message || `imgbb upload failed (status ${res.status})`,
    );
  }
  return json.data.url as string;
}
