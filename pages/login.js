import {getProviders, signIn} from "next-auth/react";

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-black via-green-500 to-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5 " src="https://links.papareact.com/9xl"  alt="logo"/>

            {Object.values(providers).map((provider)=>(
                <div key ={provider.name}>
                    <button className="shadow-2xl bg-[#18D860] text-white p-5 rounded-full" 
                    onClick={() => signIn(provider.id,{callbackUrl:"/"})} >
                        Login With {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}