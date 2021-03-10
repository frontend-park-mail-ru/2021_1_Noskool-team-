import { LINKS } from '../../constants/router';
import { UserProfile } from '../../types/requests/user';
import { redirectTo } from '../../utils/router';
import { get } from '../common/common';
import { PROFILE } from './user.constants';

export const getUser = async (): Promise<UserProfile | undefined> => {
    const response = await get(PROFILE);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return get(PROFILE).then((res) => res.json());
};
