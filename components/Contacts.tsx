export default function Contacts() {
  const contacts = [
    { label: 'Телефон', value: '+7 (967) 77‑28‑299' }, 
    { label: 'WhatsApp', value: '+7 (967) 77‑28‑299' },
    { label: 'Telegram', value: '@dpvlen' },
    { label: 'Email', value: 'dpalenov@lizing-i-tochka.ru' },
  ]
  return (
    <section id="contacts" className="py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Контакты</h2>
        <div className="mt-8 space-y-2 text-sm text-dark/80">
          {contacts.map((c) => (
            <p key={c.label}>
              <span className="font-semibold">{c.label}:</span> {c.value}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}