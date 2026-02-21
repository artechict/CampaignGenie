
export const translations = {
  en: {
    appName: "CampaignGenie",
    nav: {
      templates: "Templates",
      history: "History",
      analytics: "Analytics",
      getStarted: "Get Started"
    },
    hero: {
      title: "Craft Perfect Campaigns in Seconds",
      subtitle: "Generate expert-level subject lines, email copy, and stunning visuals using Gemini AI. Just tell us what you're selling.",
      stats: {
        openRates: "Open Rates",
        emailsBuilt: "Emails Built",
        resolution: "Visual Resolution",
        poweredBy: "Powered Engine"
      }
    },
    form: {
      placeholder: "E.g., Launching a new eco-friendly water bottle for fitness enthusiasts. Offer 20% off for the first week.",
      hint: "Describe your product, audience, and goal",
      button: "Generate Full Campaign",
      loading: "Brewing Campaign..."
    },
    display: {
      preview: "Email Preview",
      subjectLines: "Subject Lines",
      bodyCopy: "Body Copy",
      quickTip: "Quick Tip",
      tipContent: "Personalized subject lines have 50% higher open rates. Try adding a [Name] tag to your favorites!",
      export: "Export Campaign",
      strategy: "Campaign Strategy",
      strategies: [
        "Scheduled for peak engagement hours.",
        "A/B testing enabled for subject lines.",
        "Dynamic product recommendations included."
      ]
    },
    visual: {
      title: "Visual Generation",
      promptLabel: "Image Prompt",
      sizeLabel: "Size",
      ratioLabel: "Aspect Ratio",
      generate: "Generate AI Image",
      generating: "Generating High Fidelity Visual...",
      placeholder: "Generated visual will appear here",
      apiKeyLink: "Select AI Studio Key (GCP Paid)",
      billingInfo: "Note: Image generation requires a paid Google AI Studio Key."
    },
    chatbot: {
      welcome: "Hi! I am Genie. Need help with your email marketing strategy or copy?",
      placeholder: "Ask Genie anything...",
      error: "Oops, I hit a snag. Please try again!"
    },
    common: {
      loading: "Genie is working its magic...",
      errorTitle: "Failed to brew your campaign.",
      tryAgain: "Try Again"
    }
  },
  fa: {
    appName: "کمپین‌ساز هوشمند",
    nav: {
      templates: "قالب‌ها",
      history: "تاریخچه",
      analytics: "تحلیل‌ها",
      getStarted: "شروع کنید"
    },
    hero: {
      title: "ساخت کمپین‌های بی‌نقص در چند ثانیه",
      subtitle: "عنوان‌های جذاب، متن ایمیل و تصاویر خیره‌کننده را با هوش مصنوعی جمینای بسازید. فقط بگویید چه چیزی می‌فروشید.",
      stats: {
        openRates: "نرخ بازدید",
        emailsBuilt: "ایمیل‌های ساخته شده",
        resolution: "کیفیت تصاویر",
        poweredBy: "موتور هوشمند"
      }
    },
    form: {
      placeholder: "مثلاً: راه‌اندازی کمپین فروش برای محصولات جدید ارگانیک مخصوص ورزشکاران با ۲۰ درصد تخفیف...",
      hint: "محصول، مخاطب و هدف خود را شرح دهید",
      button: "تولید کامل کمپین",
      loading: "در حال جادوی کلمات..."
    },
    display: {
      preview: "پیش‌نمایش ایمیل",
      subjectLines: "عنوان‌های پیشنهادی",
      bodyCopy: "متن اصلی ایمیل",
      quickTip: "نکته سریع",
      tipContent: "عنوان‌های شخصی‌سازی شده ۵۰٪ نرخ کلیک بالاتری دارند. سعی کنید تگ [نام] را به عنوان محبوبتان اضافه کنید!",
      export: "خروجی گرفتن",
      strategy: "استراتژی کمپین",
      strategies: [
        "زمان‌بندی شده برای ساعات اوج بازدید.",
        "فعال‌سازی تست A/B برای عنوان‌ها.",
        "شامل پیشنهادات محصول هوشمند."
      ]
    },
    visual: {
      title: "تولید تصویر هوشمند",
      promptLabel: "توضیحات تصویر",
      sizeLabel: "اندازه",
      ratioLabel: "نسبت تصویر",
      generate: "ساخت تصویر با هوش مصنوعی",
      generating: "در حال خلق اثر هنری...",
      placeholder: "تصویر تولید شده اینجا نمایش داده می‌شود",
      apiKeyLink: "انتخاب کلید AI Studio (نسخه پولی)",
      billingInfo: "نکته: تولید تصویر به کلید پولی Google AI Studio نیاز دارد."
    },
    chatbot: {
      welcome: "سلام! من جینی هستم. برای استراتژی بازاریابی یا متن ایمیل کمکی می‌خواهید؟",
      placeholder: "از جینی بپرسید...",
      error: "اوه! مشکلی پیش آمد. دوباره تلاش کنید."
    },
    common: {
      loading: "جینی در حال کار روی پروژه شماست...",
      errorTitle: "مشکلی در ساخت کمپین پیش آمد.",
      tryAgain: "تلاش مجدد"
    }
  }
};

export type Language = 'en' | 'fa';
