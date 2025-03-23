interface OAuthButtonProps {
  onClick: () => void;
  disabled?: boolean;
  view: 'sign-in' | 'sign-up';
  provider: 'google' | 'github' | 'kakao' | 'naver';
}

export function OAuthButton({ onClick, disabled = false, view, provider }: OAuthButtonProps) {
  const providerConfig = {
    google: {
      name: 'Google',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20"
          height="20"
          className="mr-2"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
      ),
      bgColor: 'bg-white',
      hoverColor: 'hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
    },
    github: {
      name: 'GitHub',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-2"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-700',
      textColor: 'text-white',
      borderColor: 'border-gray-700',
    },
    kakao: {
      name: 'Kakao',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.58172 4 4 6.78533 4 10.1333C4 12.3393 5.55332 14.2653 7.8242 15.2793C7.67202 15.794 7.10618 17.8848 7.05384 18.0973C7.05384 18.0973 7.03264 18.2934 7.15388 18.3626C7.27512 18.4319 7.40326 18.3687 7.40326 18.3687C7.64562 18.3213 10.0818 16.7373 10.5918 16.3853C11.0391 16.453 11.5109 16.4885 12 16.4885C16.4183 16.4885 20 13.7033 20 10.1333C20 6.78533 16.4183 4 12 4Z"
            fill="#391B1B"
          />
        </svg>
      ),
      bgColor: 'bg-yellow-300',
      hoverColor: 'hover:bg-yellow-400',
      textColor: 'text-black',
      borderColor: 'border-yellow-500',
    },
    naver: {
      name: 'Naver',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0Z"
            fill="#03C75A"
          />
          <path
            d="M11.35 10.25L8.50005 6.19995H6.15002V13.8H8.64995V9.74995L11.5 13.8H13.85V6.19995H11.35V10.25Z"
            fill="white"
          />
        </svg>
      ),
      bgColor: 'bg-[#03C75A]',
      hoverColor: 'hover:bg-[#02a94c]',
      textColor: 'text-white',
      borderColor: 'border-[#03C75A]',
    },
  };

  const config = providerConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center py-2 px-4 border rounded-md shadow-sm ${config.bgColor} ${config.hoverColor} ${config.textColor} ${config.borderColor} text-sm font-medium disabled:opacity-70`}
    >
      {config.icon}
      {view === 'sign-in' ? `Sign in with ${config.name}` : `Sign up with ${config.name}`}
    </button>
  );
}
