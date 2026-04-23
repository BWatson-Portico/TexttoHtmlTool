window.EMAIL_TEMPLATES = window.EMAIL_TEMPLATES || [];

window.EMAIL_TEMPLATES.push({
  id: 'portico-employerlink',
  label: 'Portico EmployerLink',
  build: function (fields) {
    const esc = window.escapeHtml;
    const preheader = esc(fields.preheader);
    const projectCode = esc(fields.projectCode);
    const title = fields.title;
    const bodyHtml = fields.bodyHtml;

    const titleSection = title ? `
<tr e-editable="longerthan" e-block-id="69c41ef66f3b6d3202000007">
<td width="100%" valign="top" style="padding:0px 10px 10px 10px; margin: 0; line-height: 20px; text-align: left;">
<div style="font-family: helvetica, sans-serif; font-size: 16px; color: #545859; line-height: 20px;" e-editable="longerthanv1"><span style="color: #009ade; font-size: 18px;"><strong><span style="color: #d86018;">${esc(title)}</span><br></strong></span></div>
</td>
</tr>` : '';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en-US" e-locale="en-US" e-is-multilanguage="false">
<head>
<title>Portico Benefit Services</title>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1, user-scalable=yes">
<!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
<!--[if (gte mso 9)]>
<style type="text/css">
body {margin:0; padding:0; background:#ffffff;}
table {border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;}
table td, table th {border-collapse:collapse; font-size:1px; line-height:1px;}
.inpl-not-mailing table {border-collapse:separate;}
.lh {line-height:100% !important;}
.lh13p {line-height:108% !important;}
.lh14p {line-height:117% !important;}
.lh15p {line-height:125% !important;}
.lh16p {line-height:133% !important;}
.lh17p {line-height:142% !important;}
.lh18p {line-height:150% !important;}
.lh19p {line-height:158% !important;}
.lh20p {line-height:167% !important;}
.inpl-not-mailing .lh {line-height:1.2 !important;}
.inpl-not-mailing .lh13p {line-height:1.3 !important;}
.inpl-not-mailing .lh14p {line-height:1.4 !important;}
.inpl-not-mailing .lh15p {line-height:1.5 !important;}
.inpl-not-mailing .lh16p {line-height:1.6 !important;}
.inpl-not-mailing .lh17p {line-height:1.7 !important;}
.inpl-not-mailing .lh18p {line-height:1.8 !important;}
.inpl-not-mailing .lh19p {line-height:1.9 !important;}
.inpl-not-mailing .lh20p {line-height:2 !important;}
</style>
<![endif]-->
<!--[if (gte mso 9)|(IE)]>
<style type="text/css">
.ol650 {width:650px;}
.ol300 {width:300px;}
.ol290 {width:290px;}
.ol200 {width:200px;}
.ol188 {width:188px;}
.lhp1 {line-height:100% !important; padding:14px 40px;}
.inpl-not-mailing .lhp1 {line-height:1.2 !important; padding:0 !important;}
</style>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style>.ff {font-family:Arial, Helvetica, sans-serif;}
.fs11 {font-size:11px;}
.fs12 {font-size:12px;}
.fs14 {font-size:14px;}
.fs16 {font-size:16px;}
.fs18 {font-size:18px;}
.fs20 {font-size:20px;}
.fs24 {font-size:24px;}
.fs26 {font-size:26px;}
.fs32 {font-size:32px;}
.lh {line-height:1.2;}
.lh13p {line-height:1.3;}
.lh14p {line-height:1.4;}
.lh15p {line-height:1.5;}
.lh16p {line-height:1.6;}
.lh17p {line-height:1.7;}
.lh18p {line-height:1.8;}
.lh19p {line-height:1.9;}
.lh20p {line-height:2;}
.fc1 {color:#000000;}
.fc2 {color:#ffffff;}
.fc3 {color:#757575;}
.tdn {text-decoration:none;}
.tdu {text-decoration:underline;}
.tds, .tds span {text-decoration:line-through;}
.fwn {font-weight:normal;}
.fwb {font-weight:bold;}
.fsi {font-style:italic;}
.upc {text-transform:uppercase;}
.vab {vertical-align:bottom;}
.vat {vertical-align:top;}
.vam {vertical-align:middle;}
.la1 h1 a, .la1 h1 a:visited, .la1 h1 a:active, .la1 h2 a, .la1 h2 a:visited, .la1 h2 a:active, .la1 h3 a, .la1 h3 a:visited, .la1 h3 a:active, .la1 p a, .la1 p a:visited, .la1 p a:active {font-weight:normal; text-decoration:none; color:#000000;}
.la1b p a, .la1b p a:visited, .la1b p a:active {font-weight:bold; text-decoration:none; color:#000000;}
.la1s p a, .la1s p a:visited, .la1s p a:active {font-weight:normal; text-decoration:line-through; color:#000000;}
.la1a p a, .la1a p a:visited, .la1a p a:active {font-weight:normal; text-decoration:underline; color:#009cde; font-style:normal;}
.la2 h3 a, .la2 h3 a:visited, .la2 h3 a:active, .la2 p a, .la2 p a:visited, .la2 p a:active {font-weight:normal; text-decoration:none; color:#ffffff;}
.la3 p a, .la3 p a:visited, .la3 p a:active {font-weight:normal; text-decoration:none; color:#757575;}
.la3a p a, .la3a p a:visited, .la3a p a:active {font-weight:normal; text-decoration:underline; color:#009cde; font-style:normal;}
.lhp1, .lhp1 font {line-height:1.2;}
@media only screen and (max-width:414px) {
.fl {display:block !important; width:100% !important;}
.fw {width:100% !important; min-width:0 !important;}
.sec {width:100% !important; float:none !important;}
.mh {display:none !important;}
.image {width:100% !important; height:auto !important;}
.image1 {width:100% !important; height:auto !important;}
.rh40i {width:auto !important; height:40px !important;}
.comt {margin:0 auto !important;}
.break {display:block !important;}
.usom {display:inline-block !important; float:left !important;}
.rh4, .rh4 div {height:4px !important;}
.rh10, .rh10 div {height:10px !important;}
.rh15, .rh15 div {height:15px !important;}
.rh20, .rh20 div {height:20px !important;}
.rh25, .rh25 div {height:25px !important;}
.rh30, .rh30 div {height:30px !important;}
.rh40, .rh40 div {height:40px !important;}
.rh50, .rh50 div {height:50px !important;}
.rh60, .rh60 div {height:60px !important;}
.rh70, .rh70 div {height:70px !important;}
.rh80, .rh80 div {height:80px !important;}
.rh90, .rh90 div {height:90px !important;}
.rh100, .rh100 div {height:100px !important;}
.mbr1 {border-right:1px solid #ffffff !important;}
.rw40p {width:40% !important;}
.rw60p {width:60% !important;}
.pl5 {padding-left:5px !important;}
.pr5 {padding-right:5px !important;}
.mvab {vertical-align:bottom !important;}
.com {text-align:center !important;}
.lom {text-align:left !important;}
.rom {text-align:right !important;}
.mvat {vertical-align:top !important;}
.mfs24, .mfs24 span {font-size:24px !important;}
.mfs22, .mfs22 span {font-size:22px !important;}
.mfs20, .mfs20 span {font-size:20px !important;}
.mfs18, .mfs18 span {font-size:18px !important;}
.mfs16, .mfs16 span {font-size:16px !important;}
.mfs15, .mfs15 span {font-size:15px !important;}
.mfs14, .mfs14 span {font-size:14px !important;}
.mfs12, .mfs12 span {font-size:12px !important;}
.mfs10, .mfs10 span {font-size:10px !important;}
.rwom {width:auto !important;}
.rhom {height:auto !important;}
.rw5 {width:5px !important;}
.rw10 {width:10px !important;}
.rw16 {width:16px !important;}
.rw50 {width:50px !important;}
.rw80 {width:80px !important;}
.rw33p {width:33.33% !important;}
.rw50p {width:50% !important;}
.plr2 {padding:0 2px !important;}
.plr5 {padding:0 5px !important;}
.plr10 {padding:0 10px !important;}
.plr20 {padding:0 20px !important;}
.pl8 {padding-left:8px !important;}
.pr8 {padding-right:8px !important;}
.ctam {padding:14px 10px !important;}
.inpl-not-mailing .ctam {padding:14px 10px !important;}
}
@media only screen {body {margin:0; padding:0; background:#ffffff;}}
a, a:active, a:visited, .yshortcuts, .yshortcuts span a {text-decoration:none; font-weight:normal; color:#000000;}
a[x-apple-data-detectors] {color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important;}
[office365] td div, [office365] button {display:block !important;}
table th {padding:0; Margin:0; border:0; font-weight:normal; vertical-align:top;}
th a, th a:link, th a:visited {background:transparent; padding:0;}
noinput {display:block !important; max-height:none !important; visibility:visible !important;}
.mwn img {max-width:none !important;}
h1, h2, h3, h4, h5, h6, p {margin:0 !important; padding:0 !important;}</style>
<style type="text/css">
[class~="x_olf"] td, [class~="x_olf"] th {font-size:1px;}
</style>
<style type="text/css">
@media only screen and (max-width: 414px) {
.mfs24, .mfs24 span {font-size:6.66vw !important;}
.mfs22, .mfs22 span {font-size:6.11vw !important;}
.mfs20, .mfs20 span {font-size:5.55vw !important;}
.mfs18, .mfs18 span {font-size:5vw !important;}
.mfs16, .mfs16 span {font-size:4.44vw !important;}
.mfs15, .mfs15 span {font-size:4.16vw !important;}
.mfs14, .mfs14 span {font-size:3.88vw !important;}
.mfs12, .mfs12 span {font-size:3.33vw !important;}
.mfs10, .mfs10 span {font-size:2.77vw !important;}
u + .body .gwfw {width:100% !important; width:100vw !important;}
}
</style>
<style type="text/css">
@media only screen and (max-width:414px) {
.image1 {width:auto !important; height:auto !important; max-width:100% !important;}
}
</style>
</head>
<body class="body"><div ems:preheader style="display:none!important;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all">${preheader}</div>
<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="min-width:100%;" bgcolor="#ffffff" class="gwfw olf">
<tr>
<td width="100%" align="center" style="vertical-align:top;">
<style type="text/css">.olm-fragment-custom .image1 {width:100% !important; height:auto !important; max-width:100% !important;}</style>
<table role="presentation" cellspacing="0" cellpadding="0" width="650" bgcolor="#ffffff" class="ol650 fw">
<tr>
<td height="20"></td>
</tr>
<tr e-block-id="61c4472a2b09a1cced000002">
<td align="left" style="width:65%; padding:0px 10px 0px 10px">
<img e-editable="logo_image_en" src="https://suite42.emarsys.net/custloads/837681541/md_440215.png" width="415" border="0" style="display:block; padding:0px 0px 0px 0px" alt="Portico Logo">
</td>
</tr>
<tr e-block-id="6924beb3e342744559000005">
<td bgcolor="#ffffff" height="30" class="rh30"><div></div></td>
</tr>
${titleSection}
<tr e-editable="longerthan" e-block-id="69c42626aa6f7458f7000006">
<td width="100%" valign="top" style="padding:0px 10px 10px 10px; margin: 0; line-height: 20px; text-align: left;">
<div style="font-family: helvetica, sans-serif; font-size: 16px; color: #545859; line-height: 20px;" e-editable="longerthanv1">${bodyHtml}</div>
</td>
</tr>
<tr e-block-id="69c426ddaa6f7458f700000b">
<td bgcolor="#ffffff" height="30" class="rh30"><div></div></td>
</tr>
<tr e-repeatable-item e-block-id="69c426c8aa6f7458f700000a">
<td colspan="2" height="2" bgcolor="#f1c300" style="height: 2px; line-height: 2px;">&nbsp;</td>
</tr>
<tr e-repeatable-item style="margin-top: 20px; margin-bottom: 20px" e-block-id="69c427d0195ff8dcfc000004">
<td colspan="2">
<table style="margin-top:20px; margin-bottom:20px">
<tr>
<td class="rw100" width="100%" valign="top" style="padding:0px 10px 0px 10px;">
<p e-editable="Bodycopy_Text1_v2" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.4; color: #545859; margin: 0 !important; padding: 0 !important;"><span style="font-size: 16px;"><strong>Have any questions?</strong></span><br><span style="font-size: 16px;"> Portico Customer Care Center</span><br><span style="font-size: 16px;"> <strong>800.352.2876</strong></span><br><span style="font-size: 16px;"> <a href="mailto:mail@PorticoBenefits.org" target="_blank" rel="noopener" style="text-decoration: none; font-weight: normal; color: #000000;"><span style="font-family: helvetica, sans-serif; color: #009cde;"><u>mail@PorticoBenefits.org</u></span></a></span></p>
</td>
</tr>
</table>
</td>
</tr>
<tr e-repeatable-item e-block-id="6924beabe342744559000004">
<td colspan="2" height="2" bgcolor="#51575a" style="height: 2px; line-height: 2px;"></td>
</tr>
<tr e-block-id="69cc2731e78e182e97000004">
<td align="center" style="padding: 0px 10px 0px 10px; margin: 0" colspan="2">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: helvetica, sans-serif; font-size:14px; line-height:18px; color:#545859;">
<tr>
<td align="left" style="padding: 10px 10px 3px 0px">
<img e-editable="logo_imgVV1" src="https://suite42.emarsys.net/custloads/837681541/md_435523.png" width="55" height="46" alt="Portico Arch Logo" style="display: block">
</td>
</tr>
<tr>
<td align="left" style="padding: 3px 0">
<a e-editable="logo_link2" href="https://www.elca.org/" target="_blank" style="font-weight: normal; color: #000000; text-decoration: none;">
<p e-editable="ministry_block1" style="font-size: 16px; color: #565a5c; text-decoration: none; margin: 0 !important; padding: 0 !important;">A Ministry of the ELCA</p>
</a>
</td>
</tr>
<tr>
<td align="left" style="padding: 5px 0">
<p e-editable="links_block3" style="margin: 0 !important; padding: 0 !important;"><a href="https://employerlink.porticobenefits.org/terms-conditions" target="_blank" style="font-weight: normal; font-size: 11px; color: #565a5c; text-decoration: underline;" rel="noopener">Terms &amp; Conditions</a> <span style="color: #565a5c;">&nbsp;|&nbsp;</span> <a href="https://employerlink.porticobenefits.org/privacy" target="_blank" style="font-weight: normal; font-size: 11px; color: #565a5c; text-decoration: underline;" rel="noopener">Privacy &amp; Legal Notices</a></p>
</td>
</tr>
<tr>
<td style="padding: 5px 10px 0px 0px; font-size: 11px; line-height:16px;" e-editable="footertext55">&#xa9; Portico Benefit Services, 7700 France Ave. S., Ste. 350, Minneapolis, MN 55435-2802. All rights reserved. Please visit <a href="https://employerlink.porticobenefits.org/" target="_blank" style="font-weight: normal; font-size: 11px; color: #565a5c; text-decoration: underline;" rel="noopener">EmployerLink</a> to learn more.</td>
</tr>
</table>
<table data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed">
<tbody>
<tr>
<td style="padding: 5px 10px 3px 0px; line-height:15px; text-align: inherit;" height="100%" valign="top" bgcolor>
<div>
<div style="font-family: inherit; text-align: inherit" e-editable="footertextv88">
<span style="font-family: helvetica, sans-serif; font-size: 11px; color: #545859;">This message and any attachments may contain information that is private/confidential, the disclosure of which is protected by applicable law. If you are not the intended recipient, you are hereby notified that any dissemination, distribution, copying or other use of this message is strictly prohibited. If you are not the intended recipient of this message, please immediately delete all copies of this message and its attachments and notify the sender of its inadvertent transmission. Thank you.</span>
</div>
</div>
</td>
</tr>
</tbody>
</table>
<p style="margin: 0 !important; padding: 0 !important;"></p>
<div></div>
</td>
</tr>
<tr e-block-id="69c41cd16f3b6d3202000004">
<td align="center" style="padding: 0; margin: 0" colspan="2">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:1.4; color:#545859;">
<tr>
<td style="padding:3px 10px 3px 10px; line-height:15px; text-align:right;" height="100%" valign="top" bgcolor role="module-content" e-editable="footertextv15"><div>
<div style="font-family: inherit; text-align: right;"><span style="font-family: helvetica, sans-serif; color: #545859; font-size: 10px;">${projectCode}</span></div>
</div></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
<div style="display:none; white-space:nowrap; font:15px courier; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
<img src="https://link.notify.porticobenefits.org/mo/$uid$_836926984_122436_$llid$_$launchId$.gif" height="2" width="2" border="0" alt="" aria-hidden="true"></body>
</html>`;
  },
});
