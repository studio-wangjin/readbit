import { createClient } from '@/src/shared/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function StreakComponent() {
  const streak = 7; // 더미 데이터

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center justify-center space-x-6">
        <div className="text-4xl">🔥</div>
        <div className="text-center">
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-sm opacity-90">일 연속 학습</div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm font-medium">멋져요! 계속 이어가세요! 🎉</p>
      </div>
    </div>
  );
}

function CardsBanner() {
  return (
    <Link href="/cards" className="block">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
        <div className="text-center">
          <div className="text-3xl mb-3">📚</div>
          <h2 className="text-xl font-bold mb-2">카드 학습하러 가기</h2>
          <p className="text-sm opacity-90 mb-4">새로운 지식을 익혀보세요!</p>
          <div>
            <span className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
              시작하기 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Readbit</h1>
      </div>

      <StreakComponent />
      <CardsBanner />
    </div>
  );
}
