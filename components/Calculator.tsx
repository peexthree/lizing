'use client';
import { FC, useState, useMemo } from "react";
import Slider from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { openLeadForm } from "@/lib/openLeadForm";

const Calculator: FC = () => {
  const [cost, setCost] = useState(3000000);
  const [initialFee, setInitialFee] = useState(10);
  const [term, setTerm] = useState(36);

  const monthlyPayment = useMemo(() => {
    if (term === 0) return 0;
    const principal = cost - (cost * initialFee) / 100;
    const annualRate = 0.20; // Примерная годовая ставка 20%
    const monthlyRate = annualRate / 12;
    const payment =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    return Math.round(payment);
  }, [cost, initialFee, term]);

  const handleOpenLeadForm = () => {
    const calcSummary = `Стоимость техники: ${cost.toLocaleString()} ₽; Аванс: ${Math.round(
      (cost * initialFee) / 100
    ).toLocaleString()} ₽ (${initialFee}%); Срок: ${term} мес.; Ежемесячный платёж: ${monthlyPayment.toLocaleString()} ₽`;
    openLeadForm({ calcSummary });
  };

  return (
    <section id="calculator" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50 text-glow">
                Калькулятор
            </span>
            <h2 className="glass-title mt-4 text-3xl font-bold text-white md:text-4xl">
                Калькулятор лизинга
            </h2>
             <p className="mt-4 text-lg text-white/80 text-glow-subtle">
                Рассчитайте примерный платёж и оставьте заявку — подберём для вас лучшие условия.
            </p>
        </div>

        <div className="relative mt-12 glass-pane p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Стоимость техники
              </label>
              <p className="text-3xl font-bold text-white text-glow">
                {cost.toLocaleString()}&nbsp;₽
              </p>
              <Slider
                value={[cost]}
                onValueChange={(value) => setCost(value[0])}
                max={150000000}
                min={500000}
                step={100000}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Аванс ({initialFee}%)
              </label>
              <p className="text-3xl font-bold text-white text-glow">
                {Math.round((cost * initialFee) / 100).toLocaleString()}&nbsp;₽
              </p>
              <Slider
                value={[initialFee]}
                onValueChange={(value) => setInitialFee(value[0])}
                max={49}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Срок лизинга
              </label>
              <p className="text-3xl font-bold text-white text-glow">{term} мес.</p>
              <Slider
                value={[term]}
                onValueChange={(value) => setTerm(value[0])}
                max={60}
                min={6}
                step={1}
              />
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
            <p className="text-sm font-semibold text-emerald-400/80 text-glow">
              Ежемесячный платёж:
            </p>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-glow">
              {monthlyPayment.toLocaleString()}&nbsp;₽
            </p>
            <p className="mt-2 text-xs text-emerald-400/60 text-glow-subtle">
              Расчёт является предварительным
            </p>
          </div>
           <div className="mt-6 text-center">
             <Button variant="glow" size="lg" onClick={handleOpenLeadForm}>
                Получить точный расчёт
            </Button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
