-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2023-08-19 22:22:34
-- 服务器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `essay`
--

-- --------------------------------------------------------

--
-- 表的结构 `paper`
--

CREATE TABLE `paper` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `leftcontent` text NOT NULL,
  `rightcontent` text NOT NULL,
  `textarea` varchar(255) NOT NULL,
  `coverimg` varchar(255) NOT NULL,
  `paperid` varchar(50) NOT NULL,
  `writer` varchar(50) NOT NULL,
  `writerid` varchar(20) NOT NULL,
  `writerheadshot` int(2) NOT NULL,
  `pushtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 转存表中的数据 `paper`
--

INSERT INTO `paper` (`id`, `title`, `leftcontent`, `rightcontent`, `textarea`, `coverimg`, `paperid`, `writer`, `writerid`, `writerheadshot`, `pushtime`) VALUES
(14, '中国与东盟关系已走向成熟', '<p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">【环球时报赴东南亚特派记者 赵觉珵 胡雨薇】自1991年建立对话关系以来，中国和东盟的关系不断提质升级，双方于2021年正式建立全面战略伙伴关系，并携手建设更为紧密的中国—东盟命运共同体。30多年来，中国—东盟合作取得了令人瞩目的成就，给11国20多亿民众带来了实实在在的利益，中国—东盟关系也成为亚太区域合作中最为成功和最具活力的典范。</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">日前，《环球时报》记者在东盟秘书处所在地印尼雅加达专访了东盟秘书长高金洪，听取他对中国—东盟关系已有成果和未来发展的见解。高金洪认为，中国—东盟关系已走向成熟，达到历史最高水平。他同时强调，“一带一路”倡议与东盟的互联互通计划十分契合，相关合作将造福东盟成员国和人民。</span></p><p style=\"text-indent: 2em;\"><img src=\"http://localhost:8081/upload/image/2023-08-19/202308191215081162.jpg\" alt=\"#\" data-href=\"#\" style=\"width: 286.00px;height: 214.50px;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\"><strong>“东盟很多项目是通过共建‘一带一路’合作实现的”</strong></span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\"><strong>环球时报：您如何评价当下的中国-东盟关系？</strong></span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\"><strong>高金洪：</strong></span><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">自1991年双方建立对话关系以来，东盟与中国密切合作，伙伴关系不断提升。如今，中国已经连续14年成为东盟最大的贸易伙伴，东盟也是中国不可忽视的贸易伙伴。此外，就参与程度而言，我们在政治、安全、经济和社会文化等各个层面都已建立广泛的合作机制。</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">值得一提的是，中国—东盟博览会（东博会）也是东盟—中国关系独特性的反映，今年我们迎来了东博会20周年。</span></p>', '<p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">中国一直是《东南亚友好合作条约》（TAC）的坚定支持者。作为第一个加入TAC的伙伴，该条约成为帮助我们解决分歧、促进友好关系的重要工具。</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">纵观过去32年的东盟与中国合作历史，我们的关系已经走向成熟。双方早在2021年就同意将我们的关系提升为全面战略伙伴关系这一历史最高水平。中国是最早与东盟建立全面战略伙伴关系的国家之一，这种伙伴关系是基于双方的信赖与承诺、相互尊重和相互理解。</span></p><p style=\"text-indent: 2em; text-align: start;\"><strong>环球时报：中国与东盟十国均已签署双边共建“一带一路”合作文件，东盟也是推进“一带一路”建设的优先方向和重要伙伴。请问东盟在共建“一带一路”中取得突出成就的原因是什么？</strong></p><p style=\"text-indent: 2em; text-align: start;\"><strong>高金洪：</strong>东盟有庞大的互联互通计划。从这个角度来看，我们能够利用与中国共建“一带一路”合作所带来的机会和资源，以此获得基础设施建设所需的密集资本和大量投入。这就是为什么东盟有很多项目基本上都是通过共建“一带一路”合作实现的。我们通过增加与中国的资金融通和道路畅通，推动东盟一体化并支持东盟共同体建设。这是一个从高速公路到高铁、从港口到机场的全方位开发计划，所有这些项目都蕴含着造福东盟成员国和人民的巨大利益。</p><p style=\"text-indent: 2em; text-align: start;\"><br></p>', '东盟秘书长高金洪接受环球时报专访：中国与东盟关系已走向成熟', 'http://localhost:8081/upload/image/2023-08-19/20230819121712784.jpg', '631869kK', '6060', '12202fF', 2, '2023-08-19 12:17:15'),
(15, '元首外交 大国风范', '<p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51);\">近日，中国国家主席习近平复信南非德班理工大学孔子学院师生，鼓励他们学好中文，为传承发展中南两国友好事业、促进中非友谊合作贡献力量。2013年3月，习近平主席访问南非期间，见证了中南双方签署德班理工大学孔子学院共建协议。</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51);\">成立十年来，南非德班理工大学孔子学院累计培养了近万名学员，成为中国与南非交流合作累累硕果的一个例证。如今，大到1平方公里接收面积的射电望远镜，小到3寸长短的中医银针，中南双方一个个实打实的合作项目，不断拉近两国人民的心。</span></p><p style=\"text-indent: 2em;\"><img src=\"http://localhost:8081/upload/image/2023-08-19/202308191753255074.webp\" alt=\"#\" data-href=\"#\" style=\"width: 50%;\"><span style=\"color: rgb(51, 51, 51);\">2013年3月27日，国家主席习近平在南非德班出席金砖国家领导人第五次会晤。图为习近平发表重要讲话。新华社记者 兰红光 摄</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51);\"><strong>“希望大家到南非‘观宇宙’”</strong></span></p><p style=\"text-indent: 2em; text-align: start;\">2018年，习近平主席访问南非期间，同南非总统拉马福萨一起参观中南科技创新合作成果图片展。在南非平方公里阵列射电望远镜（SKA）项目视频和图片前，习近平主席仔细聆听介绍，并指示中方科技人员加强“中国天眼”同南非方面合作。</p><p style=\"text-indent: 2em; text-align: start;\">中国是SKA的坚定倡导者和重要贡献者，SKA也是中南重点科技合作项目。南非该项目的发展，中方几乎参与全部重要节点的建设，并为项目制造了首台天线样机。</p><p style=\"text-indent: 2em; text-align: start;\">中国科学院上海天文台青年研究员王婧颖在南非从事多年博士后研究，她发现，这几年开普地区“热”起来了——世界各地的天文学家</p>', '<p style=\"text-align: start;\">纷纷来此“扎寨”。</p><p style=\"text-indent: 2em; text-align: start;\"><img src=\"http://localhost:8081/upload/image/2023-08-19/202308191754595957.webp\" alt=\"#\" data-href=\"#\" style=\"width: 50%;\"><span style=\"color: rgb(51, 51, 51);\">“平方公里阵列射电望远镜，将成为世界上最大和最高效的天文望远镜，这是国际天文学界的焦点。”王婧颖说。</span></p><p style=\"text-indent: 2em; text-align: start;\"><span style=\"color: rgb(51, 51, 51);\">王婧颖曾在南非参与SKA及其先导项目科研工作。她说，南非科学家对“中国天眼”和中国科学家的评价极高，南非射电天文台首席科学家费尔南多·卡米洛博士多次表示希望加强与“中国天眼”的合作。离开南非时，王婧颖的老师同事给她发邮件，表示期待同中国科学家继续交流。</span></p><p style=\"text-indent: 2em; text-align: start;\"><span style=\"color: rgb(51, 51, 51);\">“中国和南非在射电天文方面的合作前景广阔。我经常鼓励学生了解和加入SKA项目，一起到南非‘观宇宙’。”王婧颖说。</span></p>', '【学习小组】中南两国人民的手牵得更紧｜元首外交 大国风范', 'http://localhost:8081/upload/image/2023-08-19/202308191756171262.webp', '285852aR', '5050', '122780dI', 3, '2023-08-19 17:56:18'),
(16, '俄外长：乌克兰问题，现在已无谈判前景', '<p style=\"text-indent: 2em;\"><img src=\"http://localhost:8081/upload/image/2023-08-19/2023081917575676.webp\" alt=\"#\" data-href=\"#\" style=\"width: 100%;\"><span style=\"color: rgb(51, 51, 51);\">俄罗斯外交部长拉夫罗夫在当地时间19日出版的《国际生活》杂志上表示，西方支持者不断推动乌克兰提高赌注，现在俄罗斯和西方之间已经没有就乌克兰问题进行谈判的前景，在没有邀请俄罗斯参加的情况下举行的吉达和哥本哈根乌克兰问题多边磋商表明西方无意与莫斯科达成任何协议。</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51);\">拉夫罗夫指出：“因此，现在还看不到俄罗斯与西方国家之间的谈判前景。同时，西方赞助者不断推动基辅政权提高赌注。我们认为，西方人虚伪地呼吁谈判是一种战术诡计，目的是再次争取时间，给疲惫不堪的乌克兰军队喘息和重整旗鼓的机会，并向他们补足武器弹药。但这是战争的方式，而不是和平解决的方式。这一点我们非常清楚。”</span></p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51);\">拉夫罗夫认为，俄罗斯在核威慑领域的国家政策完全是防御性的，其目标是将核潜力维持在保证捍卫国家主权和领土完整以及防止</span><br></p>', '<p><span style=\"color: rgb(51, 51, 51);\">对俄罗斯及其盟国的侵略所需的最低水平，拥有核武器威慑是目前应对俄罗斯安全面临的一些重大外部威胁的唯一可能对策。北约公然违反安全不可分割的原则，将自己打造成一个核联盟，将俄罗斯的“战略失败”作为其赌注。西方集体利用俄罗斯为捍卫其外部安全而作出的被迫反应作为借口，使用多种手段进行激烈对抗。</span></p><p style=\"text-indent: 2em; text-align: start;\">拉夫罗夫强调，在乌克兰危机的背景下，最大的危险是美国和北约国家通过使局势升级导致核大国之间直接武装冲突的风险。俄罗斯方面认为，必须防止这种事态的发展。</p><p style=\"text-indent: 2em; text-align: start;\"><span style=\"color: rgb(51, 51, 51);\">拉夫罗夫重申，俄罗斯完全遵循核战争打不得也打不赢的原则，必须防止核大国之间出现任何军事对抗，以避免对抗升级到核层面的可能性。现阶段最重要的任务是所有核武器国家继续遵守2022年1月3日五个核大国领导人发表的联合声明，并保持最大限度的克制。</span></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><span style=\"color: rgb(51, 51, 51);\">来源丨央视新闻，俄罗斯卫星通讯社</span></p>', '俄罗斯外交部长拉夫罗夫在当地时间19日出版的《国际生活》杂志上表示，西方支持者不断推动乌克兰提高赌注', 'http://localhost:8081/upload/image/2023-08-19/202308191801419859.webp', '393925sX', '5050', '122780dI', 3, '2023-08-19 18:01:44'),
(17, '范文1', '<p>没有内容</p>', '', '用来展示效果的没有内容', 'http://localhost:8081/upload/image/2023-08-19/202308191812454982.png', '400540sM', '5050', '122780dI', 3, '2023-08-19 18:12:46'),
(18, '范文2', '<p>123</p>', '', '范文2', 'http://localhost:8081/upload/image/2023-08-19/202308191827383241.png', '129584oZ', '5050', '122780dI', 3, '2023-08-19 18:27:40'),
(19, '范文3', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191828087008.png', '642670cU', '5050', '122780dI', 3, '2023-08-19 18:28:09'),
(20, '范文4', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191828462300.jpg', '652827tQ', '5050', '122780dI', 3, '2023-08-19 18:28:47'),
(21, '范文5', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191828585541.jpg', '621971gN', '5050', '122780dI', 3, '2023-08-19 18:28:59'),
(22, '范文6', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191829179957.jpg', '182994aK', '5050', '122780dI', 3, '2023-08-19 18:29:18'),
(23, '范文7', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191829248045.jpg', '311164jI', '5050', '122780dI', 3, '2023-08-19 18:29:29'),
(24, '范文8', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191829355619.jpg', '30723cQ', '5050', '122780dI', 3, '2023-08-19 18:29:43'),
(25, '范文9', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191829529298.jpg', '178248xQ', '5050', '122780dI', 3, '2023-08-19 18:29:53'),
(26, '范文10', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191830041856.jpg', '502383wA', '5050', '122780dI', 3, '2023-08-19 18:30:09'),
(27, '范文11', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191830173141.jpg', '677047rL', '5050', '122780dI', 3, '2023-08-19 18:30:18'),
(28, '范文12', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/20230819183026581.jpg', '505561qF', '5050', '122780dI', 3, '2023-08-19 18:30:27'),
(29, '范文13', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/20230819183039797.jpg', '27930bO', '5050', '122780dI', 3, '2023-08-19 18:30:39'),
(30, '范文14', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191830497914.jpg', '37765dC', '5050', '122780dI', 3, '2023-08-19 18:30:51'),
(31, '范文15', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/202308191831002836.jpg', '359093nD', '5050', '122780dI', 3, '2023-08-19 18:31:00'),
(32, '范文16', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/20230819183108340.jpg', '276850cO', '5050', '122780dI', 3, '2023-08-19 18:31:08'),
(33, '范文17', '<p>123</p>', '', '范文', 'http://localhost:8081/upload/image/2023-08-19/20230819183117452.jpg', '2919bG', '5050', '122780dI', 3, '2023-08-19 18:31:18');

--
-- 转储表的索引
--

--
-- 表的索引 `paper`
--
ALTER TABLE `paper`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paperid` (`paperid`),
  ADD KEY `writer_id` (`writerid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `paper`
--
ALTER TABLE `paper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- 限制导出的表
--

--
-- 限制表 `paper`
--
ALTER TABLE `paper`
  ADD CONSTRAINT `writer_id` FOREIGN KEY (`writerid`) REFERENCES `user` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
