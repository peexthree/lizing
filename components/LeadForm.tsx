body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('ok')
      setForm({
        ...initialState,
        utm_source: form.utm_source,
        utm_medium: form.utm_medium,
        utm_campaign: form.utm_campaign,
        utm_content: form.utm_content,
        referrer: form.referrer,
        calc: form.calc,
      })
    } catch {
      setStatus('err')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="lead-form" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[18%] top-[10rem] hidden h-[280px] w-[280px] bg-white/35 md:block" />
        <div className="floating-orb right-[15%] bottom-[-4rem] hidden h-[320px] w-[320px] bg-accent/20 lg:block" />
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Заявка</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Получите персональный расчёт под ваш проект</h2>
          <p className="mt-4 text-lg text-dark/70">
            Мы перезвоним в течение 15 минут в рабочее время, уточним детали и предложим лучшие варианты от партнёров.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Персональный менеджер
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Проверка договоров
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Сопровождение до выдачи
            </span>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-hero backdrop-blur-2xl animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          {form.calc && (
            <div className="mb-8 rounded-3xl border border-accent/20 bg-accent/10 p-5 text-left text-sm text-dark/70 shadow-inner">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">Расчёт из калькулятора</div>
              <p className="mt-2 leading-relaxed">{form.calc}</p>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="lead-name" className="text-sm font-semibold text-dark">
                Имя
              </label>
              <input
                id="lead-name"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-phone" className="text-sm font-semibold text-dark">
                Телефон
              </label>
              <input
                id="lead-phone"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handlePhone}
                required
@@ -240,42 +259,51 @@ export default function LeadForm() {
                className="mt-1 accent-accent"
                checked={agree}
                onChange={e => setAgree((e.target as HTMLInputElement).checked)}
              />
              <span>
                Согласен с{' '}
                <a
                  href="/privacy"
                  className="font-semibold text-accent underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой обработки персональных данных
                </a>
              </span>
            </label>
            <button
              type="submit"
              disabled={sending || !agree}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-[1]">Оставить заявку</span>
              <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Одобрение 24 часа</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Подбор техники
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Отчёт для бухгалтерии
            </span>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {status === 'ok' && (
              <p className="rounded-2xl bg-green-100/70 px-4 py-3 text-green-700" role="status" aria-live="polite">
                Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
              </p>
            )}
            {status === 'err' && (
              <p className="rounded-2xl bg-red-100/70 px-4 py-3 text-red-600" role="status" aria-live="polite">
                Проверьте поля и попробуйте ещё раз.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}