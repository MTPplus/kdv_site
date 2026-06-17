"""
Initial data seed — populates the DB with the same content as the static
data.ts in the Next.js frontend. Safe to run multiple times (uses get_or_create).
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin_project.settings')
django.setup()

from content.models import (  # noqa: E402
    SiteSettings, HeroBlock, Product, HomeService, HomeProject,
    ProviderBlock, AboutPage, ServiceItem, ProjectItem,
)


def seed():
    # SiteSettings
    SiteSettings.objects.update_or_create(
        pk=1,
        defaults=dict(
            phone='7 4212 54-41-95',
            phone_additional='+7-924-108-58-70',
            email='kran-dv@microtermplus.ru',
            email_office='office@microtermplus.ru',
            address_footer_ru='680001, г. Хабаровск, ул. Монтажная, 30, строение А, офис 21',
            address_footer_en='680001, Khabarovsk, Montazhnaya st., 30, building A, office 21',
            address_office_ru='680012 г. Хабаровск, ул. Флегонтова, 27',
            address_office_en='680012 Khabarovsk, Flegontova st., 27',
            copyright_ru='2023 @ Все права защищены.',
            copyright_en='2023 @ All rights reserved.',
            reference_list_url='https://drive.google.com/file/d/1HalIDIAwc5oqhoHxim3A78mnr8v51ahx/view',
            yandex_map_src='https://yandex.ru/map-widget/v1/?um=constructor%3Aa5577eaa4f3e4b688a0146ae51309a8d1cba1d6d711c23dc71bdca3efcdc0854&source=constructor',
        ),
    )

    # Hero
    HeroBlock.objects.update_or_create(
        pk=1,
        defaults=dict(
            title_ru='Производство грузоподъемных кранов',
            title_en='Manufacturing of lifting cranes',
            description_ru='Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
            description_en='KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity.',
            cta_label_ru='Узнать подробнее',
            cta_label_en='Learn more',
        ),
    )

    # Products
    products = [
        ('Краны козловые', 'Gantry cranes', '/images/dvkran/2023__09__product-1.png'),
        ('Краны мостовые', 'Bridge cranes', '/images/dvkran/2023__09__product-2.png'),
        ('Кран-балки', 'Jib cranes', '/images/dvkran/2023__09__product-3.png'),
        ('Крановые кабины', 'Crane cabins', '/images/dvkran/2023__09__product-4.png'),
        ('Кресло-пульты', 'Chair-consoles', '/images/dvkran/2023__09__product-5.png'),
        ('Аппаратные помещения', 'Control rooms', '/images/dvkran/2023__09__product-6.png'),
        ('Аппаратные помещения', 'Control rooms', '/images/dvkran/2023__09__product-7.png'),
        ('Вспомогательное оборудование', 'Auxiliary equipment', '/images/dvkran/2023__09__product-8.png'),
    ]
    for i, (ru, en, img) in enumerate(products):
        Product.objects.update_or_create(
            title_ru=ru, title_en=en,
            defaults=dict(image=img, order=i),
        )

    # Home services
    home_services = [
        ('Проектирование подъёмно-транспортного оборудования', 'Design of lifting and transport equipment', '/images/dvkran/2023__09__service-1.png'),
        ('Техническое обслуживание', 'Maintenance', '/images/dvkran/2023__09__service-2.png'),
        ('Модернизация кранов', 'Crane modernization', '/images/dvkran/2023__09__service-3.png'),
        ('Монтаж', 'Installation', '/images/dvkran/2023__09__service-4.png'),
        ('Доставка', 'Delivery', '/images/dvkran/2023__09__service-5.png'),
        ('Лизинг', 'Leasing', '/images/dvkran/2023__09__service-6.png'),
    ]
    for i, (ru, en, img) in enumerate(home_services):
        HomeService.objects.update_or_create(
            title_ru=ru, title_en=en,
            defaults=dict(image=img, order=i),
        )

    # Home projects
    home_projects = [
        (
            'Кран козловой (10 тонн) для Меркурий ДВ',
            'Gantry crane (10 tons) for Mercury DV',
            'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
            'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
            '/images/dvkran/2023__09__product-1.png',
        ),
        (
            'Кран козловой (16 тонн + 16 тонн) для Корфовского каменного карьера',
            'Gantry crane (16 tons + 16 tons) for Korf stone quarry',
            'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
            'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
            '/images/dvkran/2023__09__product-3.png',
        ),
        (
            'Кран козловой (10 тонн) для АО «БЭТ»',
            'Gantry crane (10 tons) for BET JSC',
            'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
            'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
            '/images/dvkran/2023__09__product-2.png',
        ),
        (
            'Кран мостовой (16 тонн) для «Хабаровск Автомост»',
            'Bridge crane (16 tons) for Khabarovsk Avtomost',
            'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
            'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
            '/images/dvkran/2023__09__product-4.png',
        ),
    ]
    for i, (tru, ten, txru, txen, img) in enumerate(home_projects):
        HomeProject.objects.update_or_create(
            title_ru=tru, title_en=ten,
            defaults=dict(text_ru=txru, text_en=txen, image=img, order=i),
        )

    # Provider
    ProviderBlock.objects.update_or_create(
        pk=1,
        defaults=dict(
            title_ru='Ответственный поставщик',
            title_en='Responsible supplier',
            paragraphs_ru=(
                'На территории регионов Дальнего Востока.\n\n'
                'Компания «КРАН-ДВ» находится в Хабаровске. Это обеспечивает оперативную коммуникацию и логистику с Заказчиком со всего ДФО.\n\n'
                'Если вы заинтересованы в нашей продукции, отправляйте завки на нашу электронную почту и получите быстрый ответ.'
            ),
            paragraphs_en=(
                'In the regions of the Far East.\n\n'
                'KRAN-DV is located in Khabarovsk. This provides prompt communication and logistics with customers across the entire Far Eastern Federal District.\n\n'
                'If you are interested in our products, send requests to our e-mail and get a quick response.'
            ),
        ),
    )

    # About page
    AboutPage.objects.update_or_create(
        pk=1,
        defaults=dict(
            title_ru='О компании',
            title_en='About the company',
            text_ru=(
                'Инжиниринговая компания полного цикла «Микротерм Плюс» успешно специализируется на проектировании и технической разработке в области промышленной автоматизации с 2002 года. За прошедшие годы, мы достигли больших успехов, реализовали множество масштабных проектов, получили ценный опыт и наработали тесные партнерские отношения со многими российскими и иностранными компаниями. Но мы не останавливаемся на достигнутом! Мы растем, становимся продуктивнее и продолжаем аккумулировать экспертный опыт, чтобы передавать его нашим заказчикам. Наша цель стать еще более эффективной компанией, для реализации новых амбициозных задач, придерживаясь высочайших стандартов качества.\n\n'
                'Основа успеха нашей компании — это сплоченная команда. Профессионалы, нацеленные на высокий результат, которые любят свою профессию, постоянно развиваются и изучают новые технологии. Из заслуг каждого состоит наш общий успех.\n\n'
                'Новая санкционная реальность создает целый ряд ограничений. Перед российскими производителями встал вопрос о выборе стратегии дальнейшего развития. Значительная часть устоявшихся подходов в инжиниринге требует пересмотра привычных решений. Имея многолетний практический опыт, мы готовы поддержать своих заказчиков в вопросах импортонезависимости в эксплуатации иностранного оборудования и систем, а также их дальнейшей модернизации.'
            ),
            text_en=(
                'Microterm Plus, a full-cycle engineering company, has been successfully specializing in design and technical development in the field of industrial automation since 2002. Over the years, we have achieved great success, implemented many large-scale projects, gained valuable experience and built close partnerships with many Russian and foreign companies. But we do not rest on our laurels! We grow, become more productive and continue to accumulate expert experience to pass it on to our customers. Our goal is to become an even more efficient company for implementing new ambitious tasks while adhering to the highest quality standards.\n\n'
                'The foundation of our company\'s success is a cohesive team. Professionals focused on high results who love their profession, constantly develop and study new technologies. Our common success consists of the merits of each.\n\n'
                'The new sanctions reality creates a number of restrictions. Russian manufacturers are faced with the question of choosing a strategy for further development. A significant part of the established approaches in engineering requires a revision of habitual solutions. With many years of practical experience, we are ready to support our customers in matters of import independence in the operation of foreign equipment and systems, as well as their further modernization.'
            ),
            signature_ru='Генеральный директор ООО «Микротерм Плюс»\nАтясов Олег Валерьевич',
            signature_en='General Director of Microterm Plus LLC\nAtyasov Oleg Valerievich',
            industry_title_ru='Индустрии и география реализованных проектов',
            industry_title_en='Industries and geography of completed projects',
            industries_ru=(
                'Промышленность строительных материалов\n'
                'Лесообрабатывающая промышленность\n'
                'Производство подъемно-транспортного оборудования\n'
                'Машиностроение и металлообработка\n'
                'Горнодобывающая промышленность\n'
                'Нефтехимическая промышленность\n'
                'Транспортные узлы и терминалы\n'
                'Угольная промышленность\n'
                'Пищевая промышленность\n'
                'Легкая промышленность\n'
                'Электроэнергетика'
            ),
            industries_en=(
                'Construction materials industry\n'
                'Woodworking industry\n'
                'Lifting and transport equipment manufacturing\n'
                'Mechanical engineering and metalworking\n'
                'Mining industry\n'
                'Petrochemical industry\n'
                'Transport hubs and terminals\n'
                'Coal industry\n'
                'Food industry\n'
                'Light industry\n'
                'Electric power industry'
            ),
            mt_today_title_ru='МИКРОТЕРМ ПЛЮС сегодня',
            mt_today_title_en='MICROTERM PLUS today',
            mt_today_tiles_ru=(
                '20 лет на рынке автоматизации\n'
                'Более 200 реализованных проектов\n'
                'География проектов охватывает всю Россию\n'
                'Точное соблюдение сроков производства работ\n'
                'Открытый диалог с заказчиком\n'
                'Качество с мировым именем\n'
                'Квалифицированные инженерные кадры\n'
                'Сертификация по международным стандартам'
            ),
            mt_today_tiles_en=(
                '20 years on the automation market\n'
                'More than 200 completed projects\n'
                'Project geography covers all of Russia\n'
                'Strict adherence to work schedules\n'
                'Open dialogue with the customer\n'
                'World-class quality\n'
                'Qualified engineering personnel\n'
                'Certification to international standards'
            ),
            certs_title_ru='Сертификаты и благодарственные письма',
            certs_title_en='Certificates and letters of gratitude',
        ),
    )

    # Service items (services page)
    service_items = [
        ('Технический аудит производства и подготовка технического задания', 'Technical audit of production and preparation of technical specifications', '/images/dvkran/2023__05__2.-tehnicheskij-audit-proizvodstva.jpg'),
        ('Разработка проектно-технической документации', 'Development of design and technical documentation', '/images/dvkran/2019__11__service-1.png'),
        ('Собственное производство комплексных шкафов автоматики', 'In-house production of complex automation cabinets', '/images/dvkran/2019__12__fuse-1-e1456753938959.jpg'),
        ('Разработка программного обеспечения среднего и верхнего уровня', 'Development of middle and upper level software', '/images/dvkran/2023__05__4.2-razrabotka-po.jpg'),
        ('Шеф-монтажные работы', 'Supervisory installation works', '/images/dvkran/2019__12__shef_montazhnye_raboty.jpg'),
        ('Гарантийное и сервисное обслуживание', 'Warranty and service maintenance', '/images/dvkran/2023__05__7.-garantijnoe-i-servisnoe-obsluzhivanie.jpg'),
        ('Удаленный мониторинг и диагностика оборудования', 'Remote monitoring and diagnostics of equipment', '/images/dvkran/2023__05__8.-udalennyj-monitoring.jpg'),
        ('Импортозамещение и локальная техподдержка', 'Import substitution and local technical support', '/images/dvkran/2019__12__1497354707_marketing-top2.jpg'),
    ]
    for i, (ru, en, img) in enumerate(service_items):
        ServiceItem.objects.update_or_create(
            title_ru=ru, title_en=en,
            defaults=dict(image=img, order=i),
        )

    # Project items (projects page)
    project_items = [
        (
            'Автоматизация технологических процессов', 'Automation of technological processes', 'Handling Equipment Modification',
            'Модернизация систем управления двумя станками поперечной резки гофрокартона.',
            'Modernization of control systems for two corrugated cardboard cross-cutting machines.',
            '/images/dvkran/2019__12__image-10.jpg',
        ),
        (
            'Автоматизация технологических процессов', 'Automation of technological processes', 'Machinery Modification',
            'Восстановление работоспособности производственной линии склейки бруса.',
            'Restoration of the operational capacity of the timber gluing production line.',
            '/images/dvkran/2019__12__production-line-for-timber-gluing-1.jpg',
        ),
        (
            'Автоматизация технологических процессов', 'Automation of technological processes', 'Machinery Modification',
            'Модернизация плоскошлифовальных станков',
            'Modernization of surface grinding machines',
            '/images/dvkran/2019__12__image-6.jpg',
        ),
        (
            'Автоматизация технологических процессов', 'Automation of technological processes', 'Machinery Modification',
            'Модернизация гидпропрессового оборудования для изготовления прессованного кирпича',
            'Modernization of hydraulic press equipment for the production of pressed bricks',
            '/images/dvkran/2019__12__pressed-bricks-production-line-2-scaled.jpg',
        ),
    ]
    for i, (cru, cen, cenl, tru, ten, img) in enumerate(project_items):
        ProjectItem.objects.update_or_create(
            title_ru=tru, title_en=ten,
            defaults=dict(case_ru=cru, case_en=cen, case_en_label=cenl, image=img, order=i),
        )

    print('Seed complete.')


if __name__ == '__main__':
    seed()
