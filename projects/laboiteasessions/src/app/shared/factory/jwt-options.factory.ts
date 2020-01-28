import { StorageService } from '../services/storage.service';

export function jwtOptionsFactory(storageService: StorageService) {
  return {
    tokenGetter: () => {
      return storageService.getItem('id_token');
    },
    skipWhenExpired: true
  };
}
