import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const USER = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const User = () => SetMetadata(USER, true);
