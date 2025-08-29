import CardStack from './components/CardStack';

export default function CardsPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-3xl font-bold text-gray-800">Tinder 스타일 카드</h1>
        <p className="text-gray-600 mt-2">좌우로 스와이프하거나 드래그해서 카드를 넘겨보세요!</p>
      </div>
      <CardStack />
    </div>
  );
}