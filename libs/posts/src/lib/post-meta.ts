import { resolvePostImage } from './resolve-image';
import { PostMeta } from './types';

export function toPostMeta(
  file: string,
  data: Record<string, unknown>
): PostMeta {
  const slug = file.replace(/\.mdx?$/, '');
  const image =
    typeof data.image === 'string'
      ? data.image
      : typeof data.imageUrl === 'string'
        ? data.imageUrl
        : undefined;

  const { image: _image, imageUrl: _imageUrl, ...rest } = data;

  return {
    slug,
    ...rest,
    image,
    imageSrc: resolvePostImage(slug, image),
  } as PostMeta;
}
