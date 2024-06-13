'use server';
import { Album } from '@/app/(models)';

export const fetchAlbum = async (
  id: string
): Promise<typeof Album | null> => {
  return await Album.findById(id)
    .populate('artist')
    .populate('songs')
    .exec();
};
