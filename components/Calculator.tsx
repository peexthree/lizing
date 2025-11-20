'use client';
import { FC, useState, useMemo } from "react";
import Slider from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";

const Calculator: FC = () => {
  const [cost, setCost] = useState(3000000);
  const [initialFee, setInitialFee] = useState(10);
  const [term, setTerm] = useState(36);

  const monthlyPayment = useMemo(() => {
    if (term === 0) return 0;
    const principal = cost - (cost * initialFee) / 100;
    const monthlyRate = 0.15 / 12;
    const payment =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    return Math.round(payment);
  }, [cost, initialFee, term]);

  return (
    <section id="calculator" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Калькулятор лизинга
        </h2>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <label className="block text-lg font-medium mb-2">
                Стоимость техники
              </label>
              <p className="text-2xl font-bold">
                {cost.toLocaleString()} ₽
              </p>
              <Slider
                value={[cost]}
                onValueChange={(value) => setCost(value[0])}
                max={20000000}
                min={500000}
                step={100000}
                className="mt-4"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                Аванс ({initialFee}%)
              </label>
              <p className="text-2xl font-bold">
                {Math.round((cost * initialFee) / 100).toLocaleString()} ₽
              </p>
              <Slider
                value={[initialFee]}
                onValueChange={(value) => setInitialFee(value[0])}
                max={49}
                min={0}
                step={1}
                className="mt-4"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                Срок лизинга
              </label>
              <p className="text-2xl font-bold">{term} мес.</p>
              <Slider
                value={[term]}
                onValueChange={(value) => setTerm(value[0])}
                max={60}
                min={6}
                step={1}
                className="mt-4"
              />
            </div>
          </div>
          <div className="text-center bg-green-100 p-6 rounded-lg">
            <p className="text-lg mb-2">Ваш ежемесячный платёж:</p>
            <p className="text-4xl font-extrabold text-green-700">
              {monthlyPayment.toLocaleString()} ₽
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Расчёт является предварительным.
            </p>
            <Button asChild variant="glow" className="mt-6">
                <a href="#hero">Оставить заявку</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
