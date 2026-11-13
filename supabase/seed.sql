-- Seed editorial do Salinas Magazine Tour
-- property 2dfce9de-de4b-57ae-a291-a170c20195cd
-- Gerado por scripts/generate-seed-sql.mjs a partir de src/data/seed.ts
insert into editions (id, title, edition_number, published_at, is_published, cover_image_url, cover_headline, cover_highlights, backcover_title, backcover_image_url, backcover_content, backcover_cta_links) values
  ('11111111-1111-4111-8111-111111111111', 'Salinas da Margarida — A edição da maré', 1, '2026-11-15', true, '/images/orla.jpg', 'Entre o mar e o rio, a Bahia que respira sal', '[{"title":"A força das mãos que sustentam a Baía","subtitle":"Marisqueiras de Conceição e a economia que nasce no mangue."},{"title":"Três dias entre Conceição, Cairu e a Barra","subtitle":"Um roteiro de mar calmo, rio doce e frutos do mar."},{"title":"Novembro é mês de Festival do Marisco","subtitle":"A cidade se senta à mesa para celebrar sua maior riqueza."}]'::jsonb, 'Gestão que olha para a maré', '/images/vista.jpg', 'Salinas da Margarida vive um tempo de reconstrução da sua relação com a Baía. O turismo sustentável, a qualificação da orla, o cuidado com o manguezal e o fortalecimento da pesca artesanal deixaram de ser discurso e passaram a orientar obras, programas e parcerias.

A gestão municipal reconhece que a cidade tem vocação náutica, gastronômica e cultural. O desafio é transformar essa vocação em renda para quem vive do mar, sem perder a calma que faz de Salinas um destino tão particular no Recôncavo.

Nesta contracapa, reunimos os canais oficiais para acompanhar o balanço de ações, os serviços públicos e as informações de transparência do município.', '[{"label":"Portal da Transparência","url":"https://www.salinasdamargarida.ba.gov.br/Site/transparencia"},{"label":"Site da Prefeitura","url":"https://www.salinasdamargarida.ba.gov.br/"},{"label":"Dados do município (IBGE)","url":"https://cidades.ibge.gov.br/brasil/ba/salinas-da-margarida"}]'::jsonb)
on conflict do nothing;

insert into articles (id, edition_id, title, subtitle, content, category, author, image_url, is_featured) values
  ('22222222-2222-4222-8222-000000000001', '11111111-1111-4111-8111-111111111111', 'A maré que sustenta Salinas', 'Da coleta do chumbinho à mesa dos restaurantes, a mariscagem é a coluna vertebral de uma economia que aprendeu a respeitar o tempo do mangue.', 'Em Salinas da Margarida, o dia começa antes do sol. A maré dita o horário, o caminho e o ritmo do trabalho. Nas águas rasas de Conceição de Salinas, mulheres de pés descalços atravessam o manguezal em busca de chumbinho, ostra, sururu e siri. É um conhecimento que passa de mãe para filha e que sustenta centenas de famílias no Recôncavo Baiano.

A cidade tem cerca de dez praias de mar calmo e uma relação antiga com a Baía de Todos-os-Santos. A pesca artesanal e a mariscagem sempre foram mais do que atividade econômica: são um modo de viver, uma forma de pertencer. O chumbinho, marisco pequeno e abundante na região, virou símbolo da cozinha local e aparece em moquecas, caldos e bolinhos.

## O trabalho que não aparece na foto

A mariscagem é feita, em grande parte, por mulheres. Elas catam, limpam, cozinham e negociam o produto. Muitas também administram bares e restaurantes à beira da praia. O conhecimento sobre marés, ventos e ciclos de reprodução é transmitido oralmente e raramente aparece nos indicadores econômicos oficiais.

Nos últimos anos, cooperativas e associações locais passaram a disputar espaço para qualificar o beneficiamento, melhorar a conservação do pescado e ampliar a venda para restaurantes e mercados da região. O desafio é conciliar renda e preservação: o manguezal precisa continuar vivo para que a maré continue generosa.

## Um destino que aprende com a água

Salinas é procurada por quem quer tranquilidade. As praias de água morna, os passeios de barco e a gastronomia de frutos do mar atraem veranistas e visitantes de cidades vizinhas. O turismo, no entanto, ainda é sazonal e concentrado nos eventos e nas férias.

A aposta de quem vive do mar é outra: um turismo de base comunitária, que valorize o trabalho da marisqueira, a história da vila e o tempo lento da Baía. Nessa lógica, a maré não é obstáculo. É calendário, escola e patrimônio.', 'Cultura', 'Redação Salinas Magazine', '/images/marisqueira.jpg', true),
  ('22222222-2222-4222-8222-000000000002', '11111111-1111-4111-8111-111111111111', 'Conceição de Salinas: o reduto pesqueiro da Baía', 'Entre a festa de Nossa Senhora da Conceição e o bordejo de canoas, a vila mantém viva uma das culturas marítimas mais fortes do Recôncavo.', 'Conceição de Salinas é uma comunidade pesqueira onde o mar organiza a vida social. As canoas coloridas descansam na areia, as redes secam ao sol e as marisqueiras voltam do mangue com baldes cheios. É um dos maiores redutos pesqueiros da Baía de Todos-os-Santos.

A vila é marcada por festejos que misturam fé e trabalho. Em dezembro, a Festa de Nossa Senhora da Conceição reúne devotos e visitantes. Em agosto, a Penitência de São Roque mantém uma tradição antiga, ligada à cura e à proteção dos pescadores. No início do ano, o bordejo de canoas celebra a relação da comunidade com o mar.

## A economia do mangue

A pesca artesanal e a mariscagem sustentam famílias inteiras. O chumbinho é o produto mais conhecido, mas a vila também trabalha com ostra, sururu, siri, aratu e caranguejo. Bares e restaurantes locais transformam esses ingredientes em moquecas, caldos e bolinhos que atraem visitantes.

O turismo de base comunitária aparece como caminho para ampliar a renda sem romper com a tradição. Passeios guiados por pescadores, oficinas de mariscagem e a venda direta do artesanato feito com cascas de marisco são algumas das iniciativas que ganham força.

## Como chegar e o que levar

Conceição fica a poucos quilômetros da sede de Salinas da Margarida, por estrada asfaltada. A praia principal é usada por moradores e veranistas, e a orla passou por melhorias nos últimos anos. Vá com calma: ali, o tempo anda no ritmo da maré.', 'História', 'Redação Salinas Magazine', '/images/cairu.jpg', true),
  ('22222222-2222-4222-8222-000000000003', '11111111-1111-4111-8111-111111111111', 'Barra do Paraguaçu: onde o rio encontra a baía', 'Na foz do Paraguaçu, águas mornas, manguezais e a memória dos antigos caminhos fluviais desenham um dos cenários mais bonitos do município.', 'A Barra do Paraguaçu é o encontro de dois mundos: o rio que desce do Recôncavo e a Baía de Todos-os-Santos. A vila de pescadores ocupa a foz, cercada por manguezais, dunas e praias de areia clara. É um lugar de água morna, adequado para banho, caiaque e pesca de linha.

No passado, a Barra foi ponto de atracação de embarcações que ligavam Salvador a Maragogipe e Cachoeira. Hoje, o acesso é por estrada, mas o rio continua sendo caminho para passeios que revelam aves, mangues e a paisagem ribeirinha.

## Roteiro de água doce e salgada

Quem visita a Barra costuma combinar o banho de mar com uma parada na Pedra Mole, onde uma queda d''água doce cai à beira da praia. O contraste entre a água salgada e a água doce é uma das marcas do lugar. Perto dali, a prainha do Tubarão e as dunas completam o roteiro.

Do outro lado do estuário, no distrito de São Francisco do Paraguaçu, ficam as ruínas do Convento de Santo Antônio do Paraguaçu, do século XVII. Muitos passeios fluviais incluem as duas margens. A recomendação é sempre contratar guias locais e respeitar o tempo da maré.

## Um convite à lentidão

A Barra não é lugar de pressa. É lugar de caminhar na maré baixa, observar o voo das garças e conversar com quem conhece cada curva do rio. Um destino para quem entende que a Bahia também se revela no silêncio.', 'Cultura', 'Redação Salinas Magazine', '/images/vista.jpg', false),
  ('22222222-2222-4222-8222-000000000004', '11111111-1111-4111-8111-111111111111', 'Moqueca de chumbinho: o sabor que vem do mangue', 'O marisco pequeno, símbolo de Conceição de Salinas, vira caldo, bolinho e moqueca em uma cozinha que nasce da maré.', 'A moqueca de chumbinho é, talvez, o prato que melhor traduz Salinas da Margarida. O marisco é catado no mangue, limpo com paciência e cozinhado com azeite de dendê, leite de coco, tomate, pimentão e coentro. O resultado é um caldo denso, levemente adocicado, que pede arroz branco, farofa e uma boa conversa.

O chumbinho é comum na região e aparece em diferentes preparos. Além da moqueca, rende caldos, bolinhos e casquinhas usadas no artesanato local. Em Conceição de Salinas, bares e restaurantes familiares mantêm receitas que passam de geração em geração.

## Comer com tempo

A gastronomia de Salinas é feita de ingredientes simples e de uma relação de confiança com quem pesca. Muitos restaurantes compram direto das marisqueiras da comunidade. O cardápio acompanha a maré: tem dia de siri, dia de ostra, dia de peixe fresco.

Quem visita a cidade deve experimentar também o caranguejo, o sururu e os bolinhos de siri. E vale perguntar ao dono do restaurante de onde veio o marisco. A resposta, quase sempre, é uma história de família.

## Onde provar

A melhor forma de descobrir é caminhar pela orla e pelas ruas das vilas. As indicações do Guia Comercial desta edição reúnem restaurantes e barracas que trabalham com produtos locais. Vá sem pressa e com espaço no prato.', 'Gastronomia', 'Redação Salinas Magazine', '/images/caranguejo.jpg', true),
  ('22222222-2222-4222-8222-000000000005', '11111111-1111-4111-8111-111111111111', 'Festival do Marisco: quando a cidade se senta à mesa', 'Em novembro, a culinária de Salinas da Margarida vira palco. O festival celebra o marisco, a marisqueira e a cultura do mangue.', 'O Festival do Marisco de Salinas da Margarida é um dos momentos mais esperados do calendário baiano. Durante os dias de festa, a cidade recebe visitantes de toda a região para provar moquecas, caldos, bolinhos e pratos feitos com o que há de mais fresco na Baía de Todos-os-Santos.

Mais do que uma feira gastronômica, o festival é uma celebração da marisqueira e do pescador artesanal. A festa movimenta restaurantes, pousadas, barracas e o comércio local, e coloca Salinas no mapa do turismo de experiência.

## A festa e a cidade

O evento costuma acontecer em novembro, junto com outras celebrações do município, como a Regata Salvador/Salinas da Margarida. A programação reúne música, cultura popular e cozinha ao vivo. Para quem vem de fora, a dica é reservar hospedagem com antecedência e chegar cedo.

## Um festival com raízes

A força do festival está na origem: ele nasce do trabalho de quem vive do mar. Cada prato carrega uma história de maré, de mangue e de família. Participar é entender que a gastronomia de Salinas não é enfeite. É economia, identidade e futuro.', 'Eventos', 'Redação Salinas Magazine', '/images/orla.jpg', false),
  ('22222222-2222-4222-8222-000000000006', '11111111-1111-4111-8111-111111111111', '1881: o sal que deu nome à cidade', 'Das primeiras salinas do Porto da Margarida à pesca artesanal de hoje, a história de Salinas é feita de água, trabalho e reinvenção.', 'A história de Salinas da Margarida começa muito antes da emancipação, em 27 de julho de 1962. A região era habitada por povos tupinambás e, com a colonização portuguesa, passou a integrar a Capitania de Itaparica e Tamarandiva. No século XIX, as terras foram concedidas ao comendador Manoel de Souza Campos, que instalou as fazendas Santa Luzia e Conceição.

Foi ele quem trouxe de Aveiro, em Portugal, o conhecimento sobre a produção de sal. Em 1881, as primeiras salinas foram inauguradas no aldeamento do Porto da Margarida. A exploração do sal atraiu trabalhadores e fez nascer os primeiros povoados, como o Arraial do Dourado e Caperenga.

## O ouro branco do Recôncavo

A Companhia Salinas da Margarida chegou a ser uma das maiores empresas do Brasil na virada dos séculos XIX e XX. O sal, a piaçava e o dendê movimentaram a economia local. Com o tempo, a atividade salineira perdeu força, mas a cidade soube se reinventar.

Hoje, a economia gira em torno da pesca artesanal, da mariscagem, do comércio, dos serviços e do turismo. O nome permanece como memória de uma época em que a cidade produzia um dos bens mais valiosos do mundo.

## Memória e futuro

Salinas da Margarida tem cerca de 15 mil habitantes e uma geografia generosa: praias de mar calmo, manguezais, rios e ilhas. A história do sal explica o passado. A maré aponta o futuro. E a cultura local, feita de samba de roda, capoeira, bordejo e fé, mantém a cidade conectada às suas raízes.', 'História', 'Redação Salinas Magazine', '/images/praia.jpg', false)
on conflict do nothing;

insert into merchants (id, name, category, description, whatsapp, maps_url, opening_hours, coupon_code, logo_url, plan_tier) values
  ('33333333-3333-4333-8333-000000000001', 'Pousada Maré de Salinas', 'Hospedagem', 'Pousada charmosa a poucos minutos da orla, com café da manhã regional, varanda e vista para a Baía. Ideal para quem quer explorar Conceição, Cairu e a Barra do Paraguaçu.', '5575999990001', 'https://www.google.com/maps/search/?api=1&query=Pousada+Mar%C3%A9+de+Salinas+Salinas+da+Margarida+BA', 'Recepção 7h às 22h', 'MARE10', '', 'highlight'),
  ('33333333-3333-4333-8333-000000000002', 'Restaurante Chumbinho da Baía', 'Gastronomia', 'Moqueca de chumbinho, casquinha de siri e caldo de sururu preparados com marisco fresco da região. Ambiente familiar à beira da praia.', '5575999990002', 'https://www.google.com/maps/search/?api=1&query=Restaurante+Chumbinho+da+Ba%C3%ADa+Salinas+da+Margarida+BA', 'Qua a dom, 11h às 21h', 'MARISCO15', '', 'sponsor'),
  ('33333333-3333-4333-8333-000000000003', 'Cairu Passeios Náuticos', 'Passeios', 'Passeios de barco pelo estuário do Paraguaçu, manguezais e ilhas da Baía. Roteiros com guia local, saída do cais de Salinas e opção de pôr do sol.', '5575999990003', 'https://www.google.com/maps/search/?api=1&query=Cais+de+Salinas+da+Margarida+BA', 'Saídas 9h, 13h e 16h', 'BARCO20', '', 'highlight'),
  ('33333333-3333-4333-8333-000000000004', 'Mercado da Marisqueira', 'Gastronomia', 'Venda direta de mariscos frescos, bolinhos de siri, camarão e polpas de pescado de produtores de Conceição de Salinas. Peça o combinado do dia.', '5575999990004', 'https://www.google.com/maps/search/?api=1&query=Mercado+da+Marisqueira+Concei%C3%A7%C3%A3o+de+Salinas+BA', 'Ter a dom, 7h às 17h', '', '', 'free'),
  ('33333333-3333-4333-8333-000000000005', 'Transporte Ilha & Mar', 'Transporte', 'Transfer entre Salvador, Bom Despacho e Salinas da Margarida, além de transporte local para praias e distritos. Agendamento por WhatsApp.', '5575999990005', 'https://www.google.com/maps/search/?api=1&query=Terminal+Rodovi%C3%A1rio+Salinas+da+Margarida+BA', 'Todos os dias, 6h às 20h', '', '', 'free'),
  ('33333333-3333-4333-8333-000000000006', 'Ateliê Conchas de Salinas', 'Artesanato', 'Artesanato feito com conchas, cascas de marisco e fibras naturais. Peças únicas que carregam a memória do mangue e da maré.', '5575999990006', 'https://www.google.com/maps/search/?api=1&query=Ateli%C3%AA+Conchas+de+Salinas+Salinas+da+Margarida+BA', 'Seg a sáb, 9h às 18h', 'ARTE10', '', 'free')
on conflict do nothing;

insert into tourism_spots (id, title, category, description, history_text, location_name, maps_url, image_url) values
  ('44444444-4444-4444-8444-000000000001', 'Ponta do Garcês', 'Praia', 'Ponta de areia com águas calmas e vista aberta para a Baía de Todos-os-Santos. Um dos lugares mais procurados para o pôr do sol e para a contemplação.', 'A Ponta do Garcês integra a paisagem de Salinas da Margarida e é frequentada por moradores e veranistas. A região combina vegetação de restinga, manguezal e águas rasas, ideais para banho e caminhadas na maré baixa.', 'Ponta do Garcês, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Ponta+do+Garc%C3%AAs+Salinas+da+Margarida+BA', '/images/praia.jpg'),
  ('44444444-4444-4444-8444-000000000002', 'Praia de Conceição', 'Praia', 'Praia de vila pesqueira, com mar calmo, areia clara e a presença das marisqueiras que trabalham no mangue. Ideal para um banho tranquilo e para conhecer a cultura local.', 'Conceição de Salinas é uma das comunidades mais tradicionais do município. A praia é o centro da vida social, das festas religiosas e do trabalho da pesca artesanal. A orla passou por melhorias e recebe veranistas durante o verão.', 'Conceição de Salinas, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Praia+de+Concei%C3%A7%C3%A3o+Salinas+da+Margarida+BA', '/images/cairu.jpg'),
  ('44444444-4444-4444-8444-000000000003', 'Ilha do Contrato', 'Ilha', 'Ilha cercada por manguezais e águas mansas, acessada por passeios de barco. Um cenário de natureza preservada, aves e silêncio.', 'As ilhas da Baía de Todos-os-Santos fazem parte do cotidiano de pescadores e marisqueiras de Salinas. A Ilha do Contrato é um dos destinos de passeios náuticos da região, com paradas para banho e contemplação.', 'Baía de Todos-os-Santos, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Ilha+do+Contrato+Salinas+da+Margarida+BA', '/images/vista.jpg'),
  ('44444444-4444-4444-8444-000000000004', 'Igreja de Nossa Senhora da Conceição', 'Patrimônio', 'Igreja que marca a fé e a história de Conceição de Salinas. Palco da festa da padroeira, em dezembro, e de celebrações que unem religião e tradição pesqueira.', 'A devoção a Nossa Senhora da Conceição está profundamente ligada à comunidade pesqueira. A festa anual mobiliza moradores, devotos e visitantes, com procissões, música e celebrações que atravessam gerações.', 'Conceição de Salinas, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Igreja+Nossa+Senhora+da+Concei%C3%A7%C3%A3o+Concei%C3%A7%C3%A3o+de+Salinas+BA', '/images/orla.jpg'),
  ('44444444-4444-4444-8444-000000000005', 'Manguezais do Paraguaçu', 'Natureza', 'Ecossistema que sustenta a mariscagem e abriga aves, caranguejos e uma biodiversidade essencial para a Baía. Melhor explorado em passeios guiados.', 'O manguezal é a base da economia de mariscagem em Salinas. É nele que se encontram o chumbinho, o siri, o caranguejo e o sururu. A preservação desse ambiente é condição para a continuidade do modo de vida local.', 'Estuário do Paraguaçu, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Manguezal+Paragua%C3%A7u+Salinas+da+Margarida+BA', '/images/marisqueira.jpg'),
  ('44444444-4444-4444-8444-000000000006', 'Barra do Paraguaçu', 'Praia', 'Vila na foz do rio Paraguaçu, com praias de água morna, dunas e manguezais. Ponto de partida para passeios fluviais e para a Pedra Mole.', 'No passado, a Barra do Paraguaçu foi ponto de atracação de embarcações que ligavam Salvador a Maragogipe e Cachoeira. Hoje, a vila mantém a relação com o rio e recebe visitantes em busca de tranquilidade.', 'Barra do Paraguaçu, Salinas da Margarida - BA', 'https://www.google.com/maps/search/?api=1&query=Barra+do+Paragua%C3%A7u+Salinas+da+Margarida+BA', '/images/vista.jpg')
on conflict do nothing;

insert into service_opportunities (id, type, title, category, description, contact_whatsapp, status, created_at) values
  ('55555555-5555-4555-8555-000000000001', 'job', 'Auxiliar de cozinha', 'Gastronomia', 'Restaurante na orla de Salinas busca auxiliar de cozinha com experiência em frutos do mar. Disponibilidade para fins de semana e feriados.', '5575999990010', 'open', '2026-11-10T09:00:00.000Z'),
  ('55555555-5555-4555-8555-000000000002', 'job', 'Marisqueira para cooperativa', 'Pesca e mariscagem', 'Cooperativa de Conceição de Salinas contrata marisqueiras para beneficiamento de mariscos. Experiência com limpeza e catação é diferencial.', '5575999990011', 'open', '2026-11-08T14:30:00.000Z'),
  ('55555555-5555-4555-8555-000000000003', 'freelancer', 'Guia de passeios náuticos', 'Turismo', 'Prestador de serviços para passeios de barco no estuário do Paraguaçu. Necessário conhecimento da região, habilitação e equipamentos de segurança.', '5575999990012', 'open', '2026-11-07T11:15:00.000Z'),
  ('55555555-5555-4555-8555-000000000004', 'freelancer', 'Fotógrafo para eventos', 'Criatividade', 'Profissional para cobertura de eventos culturais e ensaios na praia. Portfólio de fotografia natural e disponibilidade aos fins de semana.', '5575999990013', 'open', '2026-11-05T16:45:00.000Z'),
  ('55555555-5555-4555-8555-000000000005', 'job', 'Recepcionista de pousada', 'Hospedagem', 'Vaga para recepcionista com atendimento em português e espanhol. Escala 6x1, experiência com reservas e hospitalidade.', '5575999990014', 'closed', '2026-10-28T08:00:00.000Z')
on conflict do nothing;

insert into app_settings (id, storage_path, deploy_target, ai_provider, ai_api_key, ai_model, updated_at) values
  (1, 'C:\Users\Public\SalinasMagazineTour\data', 'pwa', 'gemini', '', 'gemini-3.5-flash', '2026-11-11T12:00:00.000Z')
on conflict (id) do update set storage_path = excluded.storage_path, deploy_target = excluded.deploy_target, ai_provider = excluded.ai_provider, ai_model = excluded.ai_model, updated_at = excluded.updated_at;

