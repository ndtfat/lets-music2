import { UserSetting } from 'src/user/entities/user-setting.entity';

export const userSettingDefault: UserSetting = {
  theme_color: '#000000', // default theme color
  background_url: '', // default background
  createdBy: 'system',
  createdAt: new Date(),
  updatedAt: new Date(),
  updatedBy: 'system',
};
