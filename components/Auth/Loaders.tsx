import {Oval, Watch} from 'react-loader-spinner'
import Layout from '@components/Auth/Layout'; 


export const SignupLoader= ()=> {

    return (
            <Oval
            height={80}
            width={80}
            color="#6969CE"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#7F7FE3"
            strokeWidth={2}
            strokeWidthSecondary={2}
            />
    )
}

export const AuthLoader = () => {

    return (
        <Layout>
        <div className='w-full h-full flex  justify-center items-center'>
            <Watch
            height={200}
            width={200}
            color="#6969CE"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            />
        </div>
        </Layout>
    )
}



