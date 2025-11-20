import { FC } from 'react';

const TermsPage: FC = () => {
  return (
    <main className="relative overflow-hidden pt-24 text-slate-200">
      {/* Background Gradients */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(0,206,209,0.12),transparent_58%),radial-gradient(circle_at_88%_22%,rgba(0,163,166,0.16),transparent_62%),linear-gradient(160deg,rgba(6,6,10,0.9),rgba(12,12,20,0.82))]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[140%] -translate-x-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="floating-orb left-[10%] top-[20rem] hidden h-[260px] w-[260px] bg-white/10 blur-3xl md:block" />
        <div className="floating-orb right-[6%] top-[40rem] hidden h-[320px] w-[320px] bg-accent/25 blur-3xl lg:block" />
      </div>
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 glass-title">
            Пользовательское соглашение
          </h1>
          <div className="prose prose-invert prose-lg max-w-none bg-transparent border border-white/20 rounded-2xl p-8 md:p-12 shadow-soft-lg backdrop-blur-2xl">
            <section id="general">
              <h2>1. Общие положения</h2>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Это Пользовательское соглашение (далее «Соглашение») определяет
                правила использования сайта{' '}
                <a href="https://lizing-i-tochka.ru">lizing-i-tochka.ru</a> (далее
                «Сайт»). Соглашение заключается между вами (далее «Пользователь»)
                и командой «Лизинг и точка» (далее «Оператор»).
              </p>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Когда вы пользуетесь Сайтом или оставляете заявку, вы
                подтверждаете, что прочитали и полностью приняли эти условия.
              </p>
            </section>

            <section id="subject">
              <h2>2. Что мы делаем</h2>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Мы предоставляем вам информацию о лизинге и даём возможность
                отправить заявку нашим партнёрам — банкам и лизинговым
                компаниям.
              </p>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Мы работаем как связующее звено: передаём вашу заявку партнёрам,
                но не участвуем в ваших дальнейших отношениях и сделках с ними.
              </p>
            </section>

            <section id="rights-obligations">
              <h2>3. Ваши права и наши обязанности</h2>
              <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                <li>
                  <strong>Что обязуетесь делать вы:</strong> Указывать точную
                  информацию в заявке и не использовать сайт в незаконных целях.
                </li>
                <li>
                  <strong>Что обязуемся делать мы:</strong> Хранить в тайне вашу
                  информацию согласно{' '}
                  <a href="/privacy">Политике конфиденциальности</a> и передавать
                  вашу заявку партнёрам для подготовки предложений.
                </li>
                <li>
                  <strong>На что мы имеем право:</strong> Отклонить заявку без
                  объяснения причин и изменять это Соглашение, когда потребуется.
                </li>
              </ul>
            </section>

            <section id="liability">
              <h2>4. Наша ответственность</h2>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Мы предоставляем услуги «как есть». Это значит, что мы не несём
                ответственности за условия, которые предлагают наши партнёры, и за
                их работу.
              </p>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Мы не можем гарантировать, что вашу заявку одобрят или что
                условия партнёров совпадут с вашими ожиданиями. Любая информация
                на сайте, включая расчёты в калькуляторе, является
                предварительной и носит ознакомительный характер.
              </p>
            </section>

            <section id="data-processing">
              <h2>5. Ваши данные</h2>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Правила, по которым мы собираем, храним и используем ваши личные
                данные, описаны в <a href="/privacy">Политике конфиденциальности</a>
                . Она — неотъемлемая часть этого Соглашения.
              </p>
            </section>

            <section id="final-provisions">
              <h2>6. Заключительные положения</h2>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                Соглашение начинает действовать, как только вы начинаете
                пользоваться Сайтом, и не имеет срока окончания. Все возможные
                споры решаются по законам Российской Федерации.
              </p>
              <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>Реквизиты Оператора:</p>
              <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
                <li>
                  <strong>ОГРНИП:</strong> 322237500268431
                </li>
                <li>
                  <strong>ИНН:</strong> 230907403260
                </li>
                <li>
                  <strong>Контактный e-mail для обращений:</strong>{' '}
                  <a href="mailto:dpalenov@lizing-i-tochka.ru">
                    dpalenov@lizing-i-tochka.ru
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
