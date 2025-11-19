
import { CheckCircleIcon, FileTextIcon, MessageIcon, SignatureIcon, TruckIcon } from '@/components/icons'

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
          <h1 className="glass-title text-4xl font-bold tracking-tight text-white md:text-5xl">Политика конфиденциальности</h1>
          <p className="mt-4 text-lg text-slate-300/80">Ваши данные в безопасности. Узнайте, как мы их защищаем.</p>
          <p className="mt-3 text-sm text-slate-400/70">Редакция от 13.09.2025 • Версия 1.0</p>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert mt-12 max-w-none prose-headings:font-semibold prose-headings:text-white prose-h2:border-l-4 prose-h2:border-accent/80 prose-h2:pl-4 prose-h2:text-2xl prose-h2:font-bold prose-a:text-accent prose-a:transition-colors hover:prose-a:text-accent-alt prose-strong:text-slate-100 prose-ul:space-y-2">
          <p>
            Настоящая Политика разработана в соответствии с законодательством Российской Федерации, включая Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»,
            Федеральный закон от 13.03.2006 № 38-ФЗ «О рекламе», и иными применимыми нормативными актами. Политика определяет порядок и условия обработки персональных данных, права субъектов персональных данных и меры по их защите.
          </p>

          {/* Sections start here */}
          <section id="operator">
            <h2>1. Оператор персональных данных</h2>
            <p>
              Оператором персональных данных является лицо, осуществляющее деятельность под брендом «Лизинг и точка» (далее — «Оператор»).
            </p>
            <ul>
              <li><strong>ОГРНИП:</strong> 322237500268431</li>
              <li><strong>ИНН:</strong> 230907403260</li>
              <li><strong>Контактный e-mail для обращений:</strong> <a href="mailto:dpalenov@lizing-i-tochka.ru">dpalenov@lizing-i-tochka.ru</a></li>
            </ul>
          </section>

          <section id="terms">
            <h2>2. Термины и правовые основания</h2>
            <p>
              Под персональными данными понимается любая информация, относящаяся к прямо или косвенно определённому физическому лицу. Оператор обрабатывает данные на следующих основаниях:
            </p>
            <ul>
              <li>согласие субъекта персональных данных;</li>
              <li>исполнение договора или его заключение по инициативе субъекта;</li>
              <li>исполнение обязанностей, возложенных законодательством РФ.</li>
            </ul>
          </section>

          <section id="scope">
            <h2>3. Состав обрабатываемых данных</h2>
            <p>В рамках работы сайта и оказания услуг могут обрабатываться следующие категории данных:</p>
            <ul>
              <li><strong>Идентификационные:</strong> имя, фамилия.</li>
              <li><strong>Контактные:</strong> номер телефона, e-mail.</li>
              <li><strong>Данные о запросе:</strong> вид техники, бюджет, комментарии.</li>
              <li><strong>Технические:</strong> IP-адрес, cookie, сведения о браузере.</li>
              <li><strong>Деловые реквизиты:</strong> ИНН/ОГРН (при оформлении сделки).</li>
              <li>Иные данные, предоставленные по вашей инициативе.</li>
            </ul>
          </section>

          <section id="purposes">
            <h2>4. Цели обработки</h2>
            <ul>
              <li>Связь с пользователем и подготовка персонального предложения.</li>
              <li>Заключение и исполнение договоров.</li>
              <li>Ведение бухгалтерского и налогового учёта.</li>
              <li>Улучшение работы сайта и аналитика.</li>
              <li>Защита от мошенничества и спама.</li>
            </ul>
          </section>

          <section id="processing">
            <h2>5. Сроки хранения и действия</h2>
            <p>
              Оператор осуществляет сбор, запись, хранение, использование и удаление данных. Срок хранения — до достижения целей обработки, до отзыва согласия или в течение сроков, установленных законом (например, для бухгалтерских документов).
            </p>
          </section>

          <section id="sharing">
            <h2>6. Передача третьим лицам</h2>
            <p>
              Данные могут передаваться уполномоченным поставщикам услуг (хостинг, системы аналитики, мессенджеры) на основании договоров, гарантирующих конфиденциальность. А также финансовым организациям для подготовки сделки и государственным органам в случаях, предусмотренных законом.
            </p>
          </section>
          
          <section id="rights">
            <h2>7. Права субъекта</h2>
            <p>
              Вы имеете право на доступ к своим данным, их уточнение, блокирование или уничтожение, а также на отзыв согласия. Для реализации прав направьте запрос на e-mail: <a href="mailto:dpalenov@lizing-i-tochka.ru">dpalenov@lizing-i-tochka.ru</a>.
            </p>
          </section>

          <section id="security">
            <h2>8. Меры безопасности</h2>
            <p>
              Мы реализуем необходимые правовые, организационные и технические меры для защиты данных, включая шифрование (TLS), разграничение доступа и резервное копирование.
            </p>
          </section>

          <section id="changes">
            <h2>9. Изменение Политики</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция всегда доступна на этой странице.
            </p>
          </section>

          <section id="consent">
            <h2>10. Принятие Политики</h2>
            <p>
              Продолжая использовать сайт и отправляя данные через формы, вы подтверждаете ознакомление и согласие с настоящей Политикой.
            </p>
          </section>
          
          <p className="mt-10 text-sm !text-slate-400/70">
            Примечание: расчёты и примеры на сайте носят информационный характер и не являются публичной офертой. Использование сайта означает согласие с условиями обработки персональных данных.
          </p>
        </div>
      </div>
    </main>
  );
}
