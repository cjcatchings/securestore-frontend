import PropTypes from 'prop-types'

export default function LoginBox(props) {

    const { loginFn, loginState, ...otherProps } = props;

    return (
        <div className="flex h-96 bg-blue-500 dark:bg-green-700 max-w-xl mx-auto rounded-lg shadow-md">
            <form onSubmit={loginFn} className="flex-grow-0 flex-shrink-0 basis-full">
                <div className="h-4 my-2 pt-4 pb-8">
                    <p className="text-center text-xl">Login</p>
                </div>
                <div className="h-8 pl-32">
                    <label htmlFor="username" className="text-xl">Username:  </label>
                </div>
                <div className="h-8 pl-32">
                    <input type="text" name="username" title="Username" className="shadow-sm rounded-sm w-72 h-8" data-testid="loginUsername" />
                </div>
                <div className="h-8 pl-32 mt-2">
                    <label htmlFor="password" className="text-xl">Password:  </label>
                </div>
                <div className="h-8 pl-32">
                    <input type="password" name="password" title="Password" className="shadow-sm rounded-sm w-72 h-8" data-testid="loginPassword" />
                </div>
                <div className="h-16 pl-32 pt-4">
                    <p>
                        <button type="submit" className="text-xl px-2 py-1 shadow-[3px_3px_rgba(0,0,0,0.8)] rounded-md bg-gray-400" data-testid="loginSubmitBtn">Submit</button>
                    </p>
                </div>
                <div className="h-8 pl-32">
                    <p className="py-2">
                        <input type="checkbox" name="rememberMe" className="shadow-sm rounded-sm w-4 h-4 accent-slate-300" />
                        <label htmlFor="rememberMe" className="pl-1">Remember Me</label>
                    </p>
                </div>
                <div className="h-4 pl-32">
                    <p className="py-2">{loginState}</p>
                </div>
            </form>
        </div>
    )
}

LoginBox.propTypes = {
    loginState: PropTypes.string
}