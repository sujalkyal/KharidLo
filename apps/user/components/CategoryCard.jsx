import { Card } from "@repo/ui/card";
import { Smartphone } from "lucide-react";

const CategoryCard = ({ icon: Icon, text }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-sm w-32 h-32">
      <Icon className="w-8 h-8 text-gray-700" />
      <p className="mt-2 text-sm font-medium text-gray-800">{text}</p>
    </Card>
  );
};

// Example usage
const App = () => {
  return <CategoryCard icon={Smartphone} text="Phones" />;
};

export default App;
