"""
Content models for dvkran.ru site.
Each model represents an editable piece of content.
Bilingual fields (ru/en) are stored as separate columns.
"""
from django.db import models


class SiteSettings(models.Model):
    """Singleton-like settings for the whole site (phone, email, addresses)."""

    phone = models.CharField(max_length=64, default='7 4212 54-41-95')
    phone_additional = models.CharField(max_length=64, default='+7-924-108-58-70')
    email = models.EmailField(default='kran-dv@microtermplus.ru')
    email_office = models.EmailField(default='office@microtermplus.ru')
    address_footer_ru = models.CharField(max_length=255, default='680001, г. Хабаровск, ул. Монтажная, 30, строение А, офис 21')
    address_footer_en = models.CharField(max_length=255, default='680001, Khabarovsk, Montazhnaya st., 30, building A, office 21')
    address_office_ru = models.CharField(max_length=255, default='680012 г. Хабаровск, ул. Флегонтова, 27')
    address_office_en = models.CharField(max_length=255, default='680012 Khabarovsk, Flegontova st., 27')
    copyright_ru = models.CharField(max_length=128, default='2023 @ Все права защищены.')
    copyright_en = models.CharField(max_length=128, default='2023 @ All rights reserved.')
    reference_list_url = models.URLField(
        default='https://drive.google.com/file/d/1HalIDIAwc5oqhoHxim3A78mnr8v51ahx/view'
    )
    yandex_map_src = models.URLField(
        default='https://yandex.ru/map-widget/v1/?um=constructor%3Aa5577eaa4f3e4b688a0146ae51309a8d1cba1d6d711c23dc71bdca3efcdc0854&source=constructor'
    )

    class Meta:
        verbose_name = 'Site settings'
        verbose_name_plural = 'Site settings (singleton)'

    def __str__(self):
        return 'Site settings'

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class HeroBlock(models.Model):
    """Hero section on the homepage."""

    title_ru = models.CharField(max_length=255, default='Производство грузоподъемных кранов')
    title_en = models.CharField(max_length=255, default='Manufacturing of lifting cranes')
    description_ru = models.TextField(default='Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.')
    description_en = models.TextField(default='KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity.')
    cta_label_ru = models.CharField(max_length=64, default='Узнать подробнее')
    cta_label_en = models.CharField(max_length=64, default='Learn more')

    class Meta:
        verbose_name = 'Hero block'
        verbose_name_plural = 'Hero block (singleton)'

    def __str__(self):
        return 'Hero block'

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Product(models.Model):
    """One of the 8 key products shown in the homepage product viewer."""

    title_ru = models.CharField(max_length=128)
    title_en = models.CharField(max_length=128)
    image = models.CharField(max_length=255, help_text='Path like /images/dvkran/2023__09__product-1.png')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['order']

    def __str__(self):
        return self.title_ru


class HomeService(models.Model):
    """Engineering services preview shown on the homepage."""

    title_ru = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Home service'
        verbose_name_plural = 'Home services'
        ordering = ['order']

    def __str__(self):
        return self.title_ru


class HomeProject(models.Model):
    """Projects preview shown on the homepage."""

    title_ru = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    text_ru = models.TextField()
    text_en = models.TextField()
    image = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Home project'
        verbose_name_plural = 'Home projects'
        ordering = ['order']

    def __str__(self):
        return self.title_ru


class ProviderBlock(models.Model):
    """Provider block on the homepage."""

    title_ru = models.CharField(max_length=128, default='Ответственный поставщик')
    title_en = models.CharField(max_length=128, default='Responsible supplier')
    paragraphs_ru = models.TextField(
        default='На территории регионов Дальнего Востока.\n\n'
        'Компания «КРАН-ДВ» находится в Хабаровске. Это обеспечивает оперативную коммуникацию и логистику с Заказчиком со всего ДФО.\n\n'
        'Если вы заинтересованы в нашей продукции, отправляйте завки на нашу электронную почту и получите быстрый ответ.',
        help_text='Разделяйте параграфы пустой строкой'
    )
    paragraphs_en = models.TextField(
        default='In the regions of the Far East.\n\n'
        'KRAN-DV is located in Khabarovsk. This provides prompt communication and logistics with customers across the entire Far Eastern Federal District.\n\n'
        'If you are interested in our products, send requests to our e-mail and get a quick response.',
        help_text='Separate paragraphs with an empty line'
    )

    class Meta:
        verbose_name = 'Provider block'
        verbose_name_plural = 'Provider block (singleton)'

    def __str__(self):
        return 'Provider block'

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class AboutPage(models.Model):
    """About page content."""

    title_ru = models.CharField(max_length=128, default='О компании')
    title_en = models.CharField(max_length=128, default='About the company')
    text_ru = models.TextField(
        default=(
            'Инжиниринговая компания полного цикла «Микротерм Плюс» успешно специализируется на проектировании и технической разработке в области промышленной автоматизации с 2002 года. За прошедшие годы, мы достигли больших успехов, реализовали множество масштабных проектов, получили ценный опыт и наработали тесные партнерские отношения со многими российскими и иностранными компаниями. Но мы не останавливаемся на достигнутом! Мы растем, становимся продуктивнее и продолжаем аккумулировать экспертный опыт, чтобы передавать его нашим заказчикам. Наша цель стать еще более эффективной компанией, для реализации новых амбициозных задач, придерживаясь высочайших стандартов качества.\n\n'
            'Основа успеха нашей компании — это сплоченная команда. Профессионалы, нацеленные на высокий результат, которые любят свою профессию, постоянно развиваются и изучают новые технологии. Из заслуг каждого состоит наш общий успех.\n\n'
            'Новая санкционная реальность создает целый ряд ограничений. Перед российскими производителями встал вопрос о выборе стратегии дальнейшего развития. Значительная часть устоявшихся подходов в инжиниринге требует пересмотра привычных решений. Имея многолетний практический опыт, мы готовы поддержать своих заказчиков в вопросах импортонезависимости в эксплуатации иностранного оборудования и систем, а также их дальнейшей модернизации.'
        ),
        help_text='Разделяйте параграфы пустой строкой'
    )
    text_en = models.TextField(
        default=(
            'Microterm Plus, a full-cycle engineering company, has been successfully specializing in design and technical development in the field of industrial automation since 2002. Over the years, we have achieved great success, implemented many large-scale projects, gained valuable experience and built close partnerships with many Russian and foreign companies. But we do not rest on our laurels! We grow, become more productive and continue to accumulate expert experience to pass it on to our customers. Our goal is to become an even more efficient company for implementing new ambitious tasks while adhering to the highest quality standards.\n\n'
            'The foundation of our company\'s success is a cohesive team. Professionals focused on high results who love their profession, constantly develop and study new technologies. Our common success consists of the merits of each.\n\n'
            'The new sanctions reality creates a number of restrictions. Russian manufacturers are faced with the question of choosing a strategy for further development. A significant part of the established approaches in engineering requires a revision of habitual solutions. With many years of practical experience, we are ready to support our customers in matters of import independence in the operation of foreign equipment and systems, as well as their further modernization.'
        ),
        help_text='Separate paragraphs with an empty line'
    )
    signature_ru = models.TextField(
        default='Генеральный директор ООО «Микротерм Плюс»\nАтясов Олег Валерьевич'
    )
    signature_en = models.TextField(
        default='General Director of Microterm Plus LLC\nAtyasov Oleg Valerievich'
    )
    industry_title_ru = models.CharField(max_length=255, default='Индустрии и география реализованных проектов')
    industry_title_en = models.CharField(max_length=255, default='Industries and geography of completed projects')
    industries_ru = models.TextField(
        default='Промышленность строительных материалов\nЛесообрабатывающая промышленность\nПроизводство подъемно-транспортного оборудования\nМашиностроение и металлообработка\nГорнодобывающая промышленность\nНефтехимическая промышленность\nТранспортные узлы и терминалы\nУгольная промышленность\nПищевая промышленность\nЛегкая промышленность\nЭлектроэнергетика',
        help_text='Каждая индустрия с новой строки'
    )
    industries_en = models.TextField(
        default='Construction materials industry\nWoodworking industry\nLifting and transport equipment manufacturing\nMechanical engineering and metalworking\nMining industry\nPetrochemical industry\nTransport hubs and terminals\nCoal industry\nFood industry\nLight industry\nElectric power industry',
        help_text='One industry per line'
    )
    mt_today_title_ru = models.CharField(max_length=128, default='МИКРОТЕРМ ПЛЮС сегодня')
    mt_today_title_en = models.CharField(max_length=128, default='MICROTERM PLUS today')
    mt_today_tiles_ru = models.TextField(
        default='20 лет на рынке автоматизации\nБолее 200 реализованных проектов\nГеография проектов охватывает всю Россию\nТочное соблюдение сроков производства работ\nОткрытый диалог с заказчиком\nКачество с мировым именем\nКвалифицированные инженерные кадры\nСертификация по международным стандартам',
        help_text='Один пункт на строку'
    )
    mt_today_tiles_en = models.TextField(
        default='20 years on the automation market\nMore than 200 completed projects\nProject geography covers all of Russia\nStrict adherence to work schedules\nOpen dialogue with the customer\nWorld-class quality\nQualified engineering personnel\nCertification to international standards',
        help_text='One item per line'
    )
    certs_title_ru = models.CharField(max_length=255, default='Сертификаты и благодарственные письма')
    certs_title_en = models.CharField(max_length=255, default='Certificates and letters of gratitude')

    class Meta:
        verbose_name = 'About page'
        verbose_name_plural = 'About page (singleton)'

    def __str__(self):
        return 'About page'

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class ServiceItem(models.Model):
    """Service item on the Services page."""

    title_ru = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Service item'
        verbose_name_plural = 'Service items'
        ordering = ['order']

    def __str__(self):
        return self.title_ru


class ProjectItem(models.Model):
    """Project portfolio item on the Projects page."""

    case_ru = models.CharField(max_length=255, default='Автоматизация технологических процессов')
    case_en = models.CharField(max_length=255, default='Automation of technological processes')
    case_en_label = models.CharField(max_length=255, default='Machinery Modification')
    title_ru = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Project item'
        verbose_name_plural = 'Project items'
        ordering = ['order']

    def __str__(self):
        return self.title_ru
