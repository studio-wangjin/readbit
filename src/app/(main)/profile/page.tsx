export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">프로필</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">사용자 이름</h2>
              <p className="text-gray-600">user@example.com</p>
            </div>
          </div>
          
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            프로필 편집
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-900">알림 설정</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-900">개인정보 처리방침</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-900">서비스 이용약관</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-900">버전 정보</span>
            <span className="text-gray-400">1.0.0</span>
          </button>
        </div>

        <button className="w-full mt-6 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          로그아웃
        </button>
      </div>
    </div>
  );
}