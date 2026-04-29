'use client';
import { FC, useState, useMemo } from "react";
import Slider from "@/components/ui/Slider";
import FormattedInput from "@/components/ui/FormattedInput";
import { buttonVariants } from "@/components/ui/Button";

const Calculator: FC = () => {
  const [cost, setCost] = useState(3000000);
  const [initialFee, setInitialFee] = useState(10);
  const [term, setTerm] = useState(36);

  const monthlyPayment = useMemo(() => {
    if (term === 0) return 0;
    const financedAmount = cost - (cost * initialFee) / 100;
    const annualAppreciationRate = 0.07; // Ставка удорожания 7% в год
    const totalAppreciation = financedAmount * annualAppreciationRate * (term / 12);
    const totalCost = financedAmount + totalAppreciation;
    const payment = totalCost / term;
    return Math.round(payment);
  }, [cost, initialFee, term]);

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

        <div className="relative mt-12 glass-pane p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Стоимость имущества
              </label>
              <FormattedInput
                value={cost}
                onChange={setCost}
                className="w-full bg-black/40 rounded-xl px-4 py-3 text-3xl font-bold text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-emerald-500/20 transition-all duration-300 shadow-inner"
              />
              <Slider
                value={[cost]}
                onValueChange={(value: number[]) => setCost(value[0])}
                max={150000000}
                min={500000}
                step={100000}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Аванс ({initialFee}%)
              </label>
              <p className="text-3xl font-bold text-emerald-50 bg-black/40 rounded-xl px-4 py-3 border border-emerald-500/20 shadow-inner inline-block min-w-full">
                {Math.round((cost * initialFee) / 100).toLocaleString()}&nbsp;₽
              </p>
              <Slider
                value={[initialFee]}
                onValueChange={(value: number[]) => setInitialFee(value[0])}
                max={49}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/50 text-glow">
                Срок лизинга
              </label>
              <p className="text-3xl font-bold text-emerald-50 bg-black/40 rounded-xl px-4 py-3 border border-emerald-500/20 shadow-inner inline-block min-w-full">{term} мес.</p>
              <Slider
                value={[term]}
                onValueChange={(value: number[]) => setTerm(value[0])}
                max={120} // Увеличиваем максимальный срок до 10 лет
                min={6}
                step={1}
              />
            </div>
          </div>
          <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/80 to-teal-950/80 p-8 text-center relative overflow-hidden shadow-[0_0_30px_rgba(52,211,153,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[50px] pointer-events-none" />
            <p className="text-sm font-semibold text-emerald-400/80 text-glow">
              Ежемесячный платёж:
            </p>
            <p className="relative z-10 mt-3 text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 sm:text-5xl drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              {monthlyPayment.toLocaleString()}&nbsp;₽
            </p>
            <p className="mt-2 text-xs text-emerald-400/60 text-glow-subtle">
              Расчёт является предварительным
            </p>
          </div>
           <div className="mt-6 text-center">
            <a
              className={buttonVariants({ variant: "glow", size: "lg" })}
              href="tel:+79677728299"
              aria-label="Позвонить нам для точного расчёта"
            >
                Позвонить нам
            </a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;