import { Account } from "@components/Dash/Account";
import {NextPage } from 'next';
import { AuthEnabledPage } from '../interfaces/index'

const AccountPage:AuthEnabledPage<NextPage> = () => {

    return (
        <>
            <Account/>
        </>
    )
}

AccountPage.requiresAuthentication = true;
export default AccountPage;