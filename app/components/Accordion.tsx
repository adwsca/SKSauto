import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
	<div className="border-b border-gray-200 bg-transparent">
	  <button
		onClick={() => setIsOpen(!isOpen)}
		className="w-full text-left py-4 focus:outline-none"
	  >
		<div className="flex justify-between items-center">
			<p className="text-[15px] font-medium">{title}</p>

		  	<svg 
				className={`transition-transform duration-200 transform ${
					isOpen ? 'rotate-180' : 'rotate-0'
				}`}
				width="9" 
				height="6" 
				viewBox="0 0 9 6" 
				fill="none" 
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M8.8001 1.49998L5.1751 5.12498C5.09176 5.20831 5.00843 5.26664 4.9251 5.29998C4.84176 5.33331 4.7501 5.34998 4.6501 5.34998C4.5501 5.34998 4.45843 5.33331 4.3751 5.29998C4.29176 5.26664 4.20843 5.20831 4.1251 5.12498L0.500098 1.49998C0.450098 1.44998 0.412764 1.39564 0.388098 1.33698C0.363431 1.27831 0.350764 1.21598 0.350097 1.14998C0.350097 1.01664 0.396097 0.899975 0.488097 0.799975C0.580097 0.699975 0.700764 0.649976 0.850097 0.649976L8.4501 0.649975C8.6001 0.649975 8.7211 0.699975 8.8131 0.799975C8.9051 0.899975 8.95076 1.01664 8.9501 1.14998C8.9501 1.18331 8.9001 1.29998 8.8001 1.49998Z" fill="#050B20"/>
			</svg>
		</div>
	  </button>
	  {isOpen && <div className="pb-4">{children}</div>}
	</div>
  );
};

export default Accordion;
