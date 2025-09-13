}

  return (
    <section id="lead-form" className="py-16 bg-white">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-2xl font-bold">Оставить заявку</h2>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
          />
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Тип техники"
            value={type}
            onChange={(e) => setType((e.target as HTMLInputElement).value)}
          />
          <button className="w-full rounded-2xl bg-accent py-3 font-semibold text-white shadow transition-colors hover:bg-accent/80">
            Отправить
          </button>
          {status === 'ok' && <p className="text-sm text-green-700">Готово! Мы свяжемся с вами.</p>}
          {status === 'err' && <p className="text-sm text-red-600">Проверьте поля и попробуйте ещё раз.</p>}
          <p className="text-xs text-gray-500">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
        </form>
      </div>
    </section>
  )
}