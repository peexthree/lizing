import { CheckCircleIcon, FileTextIcon, MessageIcon, SignatureIcon, TruckIcon } from '@/components/icons';

export default function PrivacyPage() {
  return (
    <main className="relative overflow-hidden pt-24 text-slate-200">
      {/* Background Gradients */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(0,206,209,0.12),transparent_58%),radial-gradient(circle_at_88%_22%,rgba(0,163,166,0.16),transparent_62%),linear-gradient(160deg,rgba(6,6,10,0.9),rgba(12,12,20,0.82))]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[140%] -translate-x-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="floating-orb left-[10%] top-[20rem] hidden h-[260px] w-[260px] bg-white/10 blur-3xl md:block" />
        <div className="floating-orb right-[6%] top-[40rem] hidden h-[320px] w-[320px] bg-accent/25 blur-3xl lg:block" />
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-24">
        {/* Header */}
        <div className="text-center">
          <h1 className="glass-title text-4xl font-bold tracking-tight text-white md:text-5xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 text-lg text-slate-300/80" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
            Ваши данные в безопасности. Узнайте, как мы их защищаем.
          </p>
          <p className="mt-3 text-sm text-slate-400/70" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>Редакция от 13.09.2025 • Версия 1.1</p>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert mt-12 max-w-none prose-headings:font-semibold prose-headings:text-white prose-h2:border-l-4 prose-h2:border-accent/80 prose-h2:pl-4 prose-h2:text-2xl prose-h2:font-bold prose-a:text-accent prose-a:transition-colors hover:prose-a:text-accent-alt prose-strong:text-slate-100 prose-ul:space-y-2 bg-white/5 border border-white/20 rounded-2xl p-8 md:p-12 shadow-soft-lg backdrop-blur-2xl">
          <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
            Эта Политика объясняет, как мы обращаемся с вашими данными. Мы работаем в
            соответствии с законами России, включая ФЗ «О персональных данных» и ФЗ «О
            рекламе».
          </p>

          <section id="operator">
            <h2>1. Кто мы?</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Оператор ваших данных — команда, работающая под брендом «Лизинг и
              точка».
            </p>
            <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              <li>
                <strong>ОГРНИП:</strong> 322237500268431
              </li>
              <li>
                <strong>ИНН:</strong> 230907403260
              </li>
              <li>
                <strong>По любым вопросам:</strong>{' '}
                <a href="mailto:dpalenov@lizing-i-tochka.ru">
                  dpalenov@lizing-i-tochka.ru
                </a>
              </li>
            </ul>
          </section>

          <section id="terms">
            <h2>2. Основные понятия</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              <strong>Персональные данные</strong> — любая информация, которая
              позволяет вас идентифицировать. Мы обрабатываем ваши данные, если:
            </p>
            <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              <li>Вы дали на это своё согласие.</li>
              <li>Это нужно для заключения или исполнения договора с вами.</li>
              <li>Этого требует законодательство.</li>
            </ul>
          </section>

          <section id="scope">
            <h2>3. Какие данные мы собираем</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Мы можем собирать следующие данные, когда вы пользуетесь нашим сайтом:
            </p>
            <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              <li>
                <strong>Личная информация:</strong> имя и фамилия.
              </li>
              <li>
                <strong>Контакты:</strong> телефон и e-mail.
              </li>
              <li>
                <strong>Детали заявки:</strong> что вы ищете, ваш бюджет и
                комментарии.
              </li>
              <li>
                <strong>Техническая информация:</strong> IP-адрес, cookie,
                информация о браузере.
              </li>
              <li>
                <strong>Реквизиты:</strong> ИНН или ОГРН, если вы заключаете
                сделку.
              </li>
              <li>Любые другие данные, которые вы решите нам предоставить.</li>
            </ul>
          </section>

          <section id="purposes">
            <h2>4. Зачем мы это делаем</h2>
            <ul style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              <li>Чтобы связаться с вами и сделать персональное предложение.</li>
              <li>Для заключения и исполнения договоров.</li>
              <li>Для ведения отчётности.</li>
              <li>Чтобы делать наш сайт лучше.</li>
              <li>Для защиты от спама и мошенничества.</li>
            </ul>
          </section>

          <section id="processing">
            <h2>5. Как долго мы храним данные</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Мы храним ваши данные до тех пор, пока это необходимо для достижения
              целей, указанных выше, пока вы не отзовёте своё согласие, или в
              течение срока, установленного законом (например, для бухгалтерских
              документов).
            </p>
          </section>

          <section id="sharing">
            <h2>6. С кем мы делимся данными</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Мы можем передавать ваши данные проверенным партнёрам (хостинг-провайдерам,
              сервисам аналитики, мессенджерам), которые помогают нам в работе и
              соблюдают конфиденциальность. Также мы передаём информацию финансовым
              организациям для подготовки сделки и госорганам, если этого требует
              закон.
            </p>
          </section>

          <section id="rights">
            <h2>7. Ваши права</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Вы можете в любой момент запросить доступ к своим данным, попросить их
              изменить или удалить, а также отозвать согласие на обработку. Просто
              напишите нам на{' '}
              <a href="mailto:dpalenov@lizing-i-tochka.ru">
                dpalenov@lizing-i-tochka.ru
              </a>
              .
            </p>
          </section>

          <section id="security">
            <h2>8. Как мы защищаем ваши данные</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Мы используем современные технические и организационные меры для
              защиты вашей информации, включая шифрование (TLS), контроль доступа и
              регулярное резервное копирование.
            </p>
          </section>

          <section id="changes">
            <h2>9. Если что-то изменится</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Мы можем обновлять эту Политику. Новая версия всегда будет доступна на
              этой странице.
            </p>
          </section>

          <section id="consent">
            <h2>10. Ваше согласие</h2>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Используя наш сайт и отправляя заявки, вы подтверждаете, что
              прочитали эту Политику и согласны с её условиями.
            </p>
          </section>

          <p className="mt-10 text-sm !text-slate-400/70" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
            <strong>Примечание:</strong> Расчёты и предложения на сайте не являются
            официальным предложением (офертой) и носят информационный характер.
            Продолжая использовать сайт, вы соглашаетесь с нашими правилами
            обработки данных.
          </p>
        </div>
      </div>
    </main>
  );
}
