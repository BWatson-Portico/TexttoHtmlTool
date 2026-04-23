window.EMAIL_TEMPLATES = window.EMAIL_TEMPLATES || [];

window.EMAIL_TEMPLATES.push({
  id: 'portico-mp',
  label: 'Portico MP (default)',
  build: function (fields) {
    const esc = window.escapeHtml;
    const preheader = esc(fields.preheader);
    const projectCode = esc(fields.projectCode);
    const title = fields.title;
    const bodyHtml = fields.bodyHtml;

    const titleSection = title ? `
<tr><td width="100%" valign="top" style="padding:0px 10px 10px 10px;margin:0;line-height:20px;text-align:left;">
<div style="font-family:helvetica,sans-serif;font-size:16px;color:#545859;line-height:20px;">
<span style="color:#009ade;font-size:18px;"><strong>${esc(title)}</strong></span>
</div></td></tr>` : '';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
<title>Portico Benefit Services</title>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1, user-scalable=yes">
<style>
body{margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;}
table{border-collapse:collapse;}
h1,h2,h3,h4,h5,h6,p{margin:0!important;padding:0!important;}
a,a:active,a:visited{text-decoration:none;font-weight:normal;color:#000000;}
</style>
</head>
<body>
<div id="preHeader" style="display:none!important;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>
<table role="presentation" cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
<tr><td align="center" style="vertical-align:top;">
<table role="presentation" cellspacing="0" cellpadding="0" width="650" bgcolor="#ffffff">
<tr><td height="20"></td></tr>
<tr><td align="left" style="padding:0px 10px 0px 10px;">
<img src="https://suite42.emarsys.net/custloads/837681541/md_440215.png" width="415" border="0" style="display:block;" alt="Portico Logo">
</td></tr>
<tr><td bgcolor="#ffffff" height="30"></td></tr>
${titleSection}
<tr><td width="100%" valign="top" style="padding:0px 10px 10px 10px;margin:0;line-height:20px;text-align:left;">
<div style="font-family:helvetica,sans-serif;font-size:16px;color:#545859;line-height:20px;">${bodyHtml}</div>
</td></tr>
<tr><td bgcolor="#ffffff" height="30"></td></tr>
<tr><td colspan="2" height="2" bgcolor="#f1c300" style="height:2px;line-height:2px;">&nbsp;</td></tr>
<tr><td colspan="2"><table style="margin-top:20px;margin-bottom:20px;"><tr><td style="padding:0px 10px 0px 10px;">
<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;color:#545859;margin:0!important;padding:0!important;">
<span style="font-size:16px;"><strong>Have any questions?</strong></span><br>
<span style="font-size:16px;"> Portico Customer Care Center</span><br>
<span style="font-size:16px;"> <strong>800.352.2876</strong></span><br>
<span style="font-size:16px;"> <a href="mailto:mail@PorticoBenefits.org" style="text-decoration:none;font-weight:normal;color:#000000;"><span style="font-family:helvetica,sans-serif;color:#009cde;"><u>mail@PorticoBenefits.org</u></span></a></span>
</p></td></tr></table></td></tr>
<tr><td colspan="2" height="2" bgcolor="#51575a" style="height:2px;line-height:2px;"></td></tr>
<tr><td align="center" style="padding:0px 10px 0px 10px;" colspan="2">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family:helvetica,sans-serif;font-size:14px;line-height:18px;color:#545859;">
<tr><td align="left" style="padding:10px 10px 3px 0px"><img src="https://suite42.emarsys.net/custloads/837681541/md_435523.png" width="55" height="46" alt="Portico Arch Logo" style="display:block;"></td></tr>
<tr><td align="left" style="padding:3px 0"><p style="font-size:16px;color:#565a5c;margin:0!important;padding:0!important;">A Ministry of the ELCA</p></td></tr>
<tr><td align="left" style="padding:5px 0"><p style="margin:0!important;padding:0!important;">
<a href="https://myportico.porticobenefits.org/terms-conditions" target="_blank" style="font-weight:normal;font-size:11px;color:#565a5c;text-decoration:underline;">Terms &amp; Conditions</a>
<span style="color:#565a5c;">&nbsp;|&nbsp;</span>
<a href="https://myportico.porticobenefits.org/privacy" target="_blank" style="font-weight:normal;font-size:11px;color:#565a5c;text-decoration:underline;">Privacy &amp; Legal Notices</a>
</p></td></tr>
<tr><td style="padding:5px 10px 0px 0px;font-size:11px;line-height:16px;">
&#xa9; Portico Benefit Services, 7700 France Ave. S., Ste. 350, Minneapolis, MN 55435-2802. All rights reserved. Please visit
<a href="https://myportico.porticobenefits.org/" target="_blank" style="font-weight:normal;font-size:11px;color:#565a5c;text-decoration:underline;">myPortico</a> to learn more.
</td></tr>
<tr><td style="padding:5px 10px 3px 0px;line-height:15px;">
<span style="font-family:helvetica,sans-serif;font-size:11px;color:#545859;">This message and any attachments may contain information that is private/confidential, the disclosure of which is protected by applicable law. If you are not the intended recipient, you are hereby notified that any dissemination, distribution, copying or other use of this message is strictly prohibited. If you are not the intended recipient of this message, please immediately delete all copies of this message and its attachments and notify the sender of its inadvertent transmission. Thank you.</span>
</td></tr>
</table>
<p style="margin:0!important;padding:0!important;"></p>
</td></tr>
<tr><td align="center" style="padding:0;margin:0;" colspan="2">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td style="padding:3px 10px 3px 10px;line-height:15px;text-align:right;" valign="top">
<div style="text-align:right;"><span style="font-family:helvetica,sans-serif;color:#545859;font-size:10px;">${projectCode}</span>&nbsp;</div>
</td></tr>
</table>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  },
});
