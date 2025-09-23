import type { SVGProps } from 'react'
import type { ReactNode } from 'react'

type IconProps = SVGProps<SVGSVGElement>

type IconBaseProps = IconProps & { children: ReactNode }

const IconBase = ({ children, ...props }: IconBaseProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </IconBase>
)

export const PenIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 15.5V20h4.5L19.6 8.9a2.6 2.6 0 0 0 0-3.6l-.9-.9a2.6 2.6 0 0 0-3.6 0Z" />
    <path d="M12 7l5 5" />
  </IconBase>
)

export const PhoneIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6.2 4.8C5 6 4.7 7.8 5 10.2c.5 3.7 3.8 7.4 6.8 9.3 2.4 1.4 4.1 1.7 5.4.4l1.4-1.4c.4-.4.3-1-.2-1.3l-3-1.4a1 1 0 0 0-1.1.2l-.8.8a11 11 0 0 1-4.5-4.5l.8-.8a1 1 0 0 0 .2-1.1l-1.4-3c-.2-.5-.9-.6-1.3-.2Z" />
  </IconBase>
)

export const CloseIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6 6l12 12" />
    <path d="M6 18 18 6" />
  </IconBase>
)

export const BadgePercentIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="m9 15 6-6" />
    <circle cx={9} cy={9} r={1.2} />
    <circle cx={15} cy={15} r={1.2} />
  </IconBase>
)

export const HandshakeIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M3 9h4l3 3" />
    <path d="M21 9h-4l-3 3" />
    <path d="M7 9v5l3 3 2-2 2 2 3-3V9" />
    <path d="m8.5 15.5 1.5 1.5" />
    <path d="m15.5 15.5-1.5 1.5" />
  </IconBase>
)

export const MedalIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    <path d="M8 13v6l4-2 4 2v-6" />
  </IconBase>
)

export const TimerIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M10 4h4" />
    <path d="M12 2v2" />
    <circle cx={12} cy={13} r={7} />
    <path d="M12 8v5l3 3" />
  </IconBase>
)

export const ArrowDownIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </IconBase>
)

export const CheckCircleIcon = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={12} cy={12} r={8} />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </IconBase>
)

export const GaugeIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M5 16.5A7.5 7.5 0 0 1 12 5a7.5 7.5 0 0 1 7 11.5" />
    <path d="M7 18h10" />
    <path d="M12 12l4-4" />
  </IconBase>
)

export const SparkleIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 4v4" />
    <path d="M12 16v4" />
    <path d="M4 12h4" />
    <path d="M16 12h4" />
    <path d="m7.5 7.5 2.5 2.5" />
    <path d="m14 14 2.5 2.5" />
    <path d="m16.5 7.5-2.5 2.5" />
    <path d="m9.5 14-2.5 2.5" />
  </IconBase>
)

export const ArrowRightIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </IconBase>
)

export const MailIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4.5 6h15a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6Z" />
    <path d="m5 7 7 6 7-6" />
  </IconBase>
)

export const MessageIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6 5h12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-5l-4.5 3V16H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
  </IconBase>
)

export const SaveIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6 4h9l3 3v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
    <path d="M9 4v5h6V7" />
    <path d="M9 16h6" />
  </IconBase>
)

export const CalculatorIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x={5} y={3} width={14} height={18} rx={2} />
    <path d="M8 7h8" />
    <path d="M9 12h.01" />
    <path d="M12 12h.01" />
    <path d="M15 12h.01" />
    <path d="M9 15h.01" />
    <path d="M12 15h.01" />
    <path d="M15 15h.01" />
  </IconBase>
)

export const SignatureIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M16 3H8a2 2 0 0 0-2 2v14l6-3 6 3V7" />
    <path d="M9 10h3" />
    <path d="M9 13h6" />
    <path d="m15.5 3.5 2 2a2 2 0 0 1-2.8 2.8L12 7" />
  </IconBase>
)

export const FileTextIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M7 4a2 2 0 0 1 2-2h5l5 5v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z" />
    <path d="M14 2v4h4" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </IconBase>
)

export const TruckIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M3 7h10v8H3Z" />
    <path d="M13 10h4l3 3v5h-3" />
    <circle cx={7} cy={18} r={2} />
    <circle cx={17} cy={18} r={2} />
    <path d="M5 18h2" />
    <path d="M15 18h2" />
  </IconBase>
)

export const WhatsAppLineIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M5.5 19.5 6.5 16A7.5 7.5 0 1 1 12 19.5a7.8 7.8 0 0 1-3.2-.7Z" />
    <path d="M9.5 9.8c-.2-.4-.3-.8-.2-1l.5-.7c.2-.3.2-.6 0-.9L8.8 6c-.2-.4-.7-.5-1-.3-1 .7-1.6 1.7-1.6 2.8 0 2.8 3.1 5.9 5.9 5.9 1.1 0 2.1-.6 2.8-1.6.2-.3.1-.8-.3-1l-1.2-.8c-.3-.2-.6-.2-.9 0l-.7.5c-.3.1-.6 0-1-.2a7.6 7.6 0 0 1-1.3-1.2c-.5-.5-.9-1-.7-1.4Z" />
  </IconBase>
)

export const TelegramLineIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m5 12 13-6.5a.7.7 0 0 1 1 .7l-2 11a.7.7 0 0 1-1 .5l-3.8-2.4-2.4 2.4-.4-3.6Z" />
  </IconBase>
)

export const ArrowUpRightIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </IconBase>
)
