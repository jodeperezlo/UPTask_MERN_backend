import nodemailer from 'nodemailer';
import config from '../../../config/config.js';

const transporter = nodemailer.createTransport({
	host: config.EMAIL_HOST,
	port: config.EMAIL_PORT,
	secure: true,
	auth: {
		user: config.EMAIL_USER,
		pass: config.EMAIL_PASS,
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	},
});

// verify connection configuration
export const verifyTransporterEmail = () => {
	transporter.verify(function (error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log('Server is ready to send messages.');
		}
	});
};

export const sendEmailRegister = (data) => {
	const { email, username, token } = data;

	// Email structure
	const mailOptions = {
		from: '"UpTask - Administrador de Proyectos" <uptaskmern@email.com>',
		to: email,
		subject: 'UpTask - Confirma tu cuenta',
		text: 'Confirma tu cuenta en UpTask',
		html: `
		<!DOCTYPE html>
		<html
			lang="en"
			xmlns="http://www.w3.org/1999/xhtml"
			xmlns:o="urn:schemas-microsoft-com:office:office"
		>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<meta name="x-apple-disable-message-reformatting" />
				<title></title>
				<!--[if mso]>
					<style>
						table {
							border-collapse: collapse;
							border-spacing: 0;
							border: none;
							margin: 0;
						}
						div,
						td {
							padding: 0;
						}
						div {
							margin: 0 !important;
						}
					</style>
					<noscript>
						<xml>
							<o:OfficeDocumentSettings>
								<o:PixelsPerInch>96</o:PixelsPerInch>
							</o:OfficeDocumentSettings>
						</xml>
					</noscript>
				<![endif]-->
				<style>
					table,
					td,
					div,
					h1,
					p {
						font-family: Arial, sans-serif;
					}
					@media screen and (max-width: 530px) {
						.unsub {
							display: block;
							padding: 8px;
							margin-top: 14px;
							border-radius: 6px;
							background-color: #555555;
							text-decoration: none !important;
							font-weight: bold;
						}
						.col-lge {
							max-width: 100% !important;
						}
					}
					@media screen and (min-width: 531px) {
						.col-sml {
							max-width: 27% !important;
						}
						.col-lge {
							max-width: 73% !important;
						}
					}
				</style>
			</head>
			<body
				style="
					margin: 0;
					padding: 0;
					word-spacing: normal;
					background-color: #D8E3ED;
				"
			>
				<div
					role="article"
					aria-roledescription="email"
					lang="en"
					style="
						text-size-adjust: 100%;
						-webkit-text-size-adjust: 100%;
						-ms-text-size-adjust: 100%;
						background-color: #D8E3ED;
					"
				>
					<table
						role="presentation"
						style="width: 100%; border: none; border-spacing: 0"
					>
						<tr>
							<td align="center" style="padding: 0">
								<!--[if mso]>
							<table role="presentation" align="center" style="width:600px;">
							<tr>
							<td>
							<![endif]-->
								<table
									role="presentation"
									style="
										width: 94%;
										max-width: 600px;
										border: none;
										border-spacing: 0;
										text-align: left;
										font-family: Arial, sans-serif;
										font-size: 16px;
										line-height: 22px;
										color: #363636;
									"
								>
									<tr>
										<td
											style="
												padding: 40px 30px 30px 30px;
												text-align: center;
												font-size: 24px;
												font-weight: bold;
											"
										>
											<a
												href='${config.FRONTEND_URL}'
												target="_blank"
												style="
													text-decoration: none;
													color: #363636;
													display: flex;
													justify-content: center;
													align-items: center;
													gap: 2rem;
												"
												><img
													src="https://raw.githubusercontent.com/jodeperezlo/UPTask_MERN_backend/master/assets/img/uptask.png"
													width="32"
													alt="Logo UpTask MERN"
													style="
														width: 68px;
														max-width: 80%;
														height: auto;
														border: none;
														text-decoration: none;
														color: #ffffff;
													"
												/>UpTask MERN</a
											>
										</td>
									</tr>
									<tr>
										<td style="padding: 30px; background-color: #ffffff">
											<h1
												style="
													margin-top: 0;
													margin-bottom: 16px;
													font-size: 26px;
													line-height: 32px;
													font-weight: bold;
													letter-spacing: -0.02em;
												"
											>
												Bienvenido ${username}
											</h1>
											<h3
												style="
													margin-top: 0;
													margin-bottom: 16px;
													font-size: 20px;
													line-height: 32px;
													font-weight: bold;
													letter-spacing: -0.02em;
												"
											>
												Tu cuenta está casi lista, sólo te falta confirmarla.
											</h3>
											<p style="margin: 0">
												Gracias por registrarte en UpTask, tus proyectos ahora
												tendrán un mejor orden. Estamos ansios de que ya inicies con
												tu primer proyecto.
											</p>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 0;
												font-size: 24px;
												line-height: 28px;
												font-weight: bold;
											"
										>
											<img
												src="https://cdn.pixabay.com/photo/2015/05/28/14/38/ux-787980_960_720.jpg"
												width="600"
												alt=""
												style="
													width: 100%;
													height: auto;
													display: block;
													border: none;
													text-decoration: none;
													color: #363636;
												"
											/>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 35px 30px 11px 30px;
												font-size: 0;
												background-color: #ffffff;
												border-bottom: 1px solid #f0f0f5;
												border-color: rgba(201, 201, 207, 0.35);
											"
										>
											<!--[if mso]>
										<table role="presentation" width="100%">
										<tr>
										<td style="width:145px;" align="left" valign="top">
										<![endif]-->

											<!--[if mso]>
										</td>
										<td style="width:395px;padding-bottom:20px;" valign="top">
										<![endif]-->
											<div
												class="col-lge"
												style="
													display: inline-block;
													width: 100%;
													max-width: 395px;
													vertical-align: top;
													padding-bottom: 20px;
													font-family: Arial, sans-serif;
													font-size: 16px;
													line-height: 22px;
													color: #363636;
												"
											>
												<p style="margin-top: 0; margin-bottom: 12px">
													Para confirmar tu cuenta, por favor, haz click en el
													siguiente enlace:
												</p>
												<p style="margin: 0">
													<a
														href="${config.FRONTEND_URL}/confirm-account/${token}"
														target="_blank"
														style="
															background: #0284c7;
															text-decoration: none;
															padding: 10px 25px;
															color: #ffffff;
															border-radius: 4px;
															display: inline-block;
															mso-padding-alt: 0;
															text-underline-color: #0284c7;
														"
														><!--[if mso
															]><i
																style="
																	letter-spacing: 25px;
																	mso-font-width: -100%;
																	mso-text-raise: 20pt;
																"
																>&nbsp;</i
															><!
														[endif]--><span
															style="mso-text-raise: 10pt; font-weight: bold"
															>Confirma tu cuenta</span
														><!--[if mso
															]><i
																style="letter-spacing: 25px; mso-font-width: -100%"
																>&nbsp;</i
															><!
														[endif]-->
													</a>
												</p>
											</div>
											<!--[if mso]>
										</td>
										</tr>
										</table>
										<![endif]-->
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 30px;
												font-size: 24px;
												line-height: 28px;
												font-weight: bold;
												background-color: #ffffff;
												border-bottom: 1px solid #f0f0f5;
												border-color: rgba(201, 201, 207, 0.35);
											"
										>
											<a
												href='${config.FRONTEND_URL}'
												style="text-decoration: none"
												><img
													src="https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_960_720.jpg"
													width="540"
													alt=""
													style="
														width: 100%;
														height: auto;
														border: none;
														text-decoration: none;
														color: #363636;
													"
											/></a>
										</td>
									</tr>
									<tr>
										<td style="padding: 30px; background-color: #ffffff">
											<p style="margin: 0">
												Si tienes cualquier duda 🤔 puedes contactarte con nosotros,
												estamos disponibles las 24 horas. 🕗
											</p>
											<p style="margin: 0">
												Si tú no creaste la cuenta, haz caso omiso a este correo. 📧
											</p>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 30px;
												text-align: center;
												font-size: 12px;
												background-color: #7890A5;
												color: #cccccc;
											"
										>
											<p style="margin: 0 0 8px 0">
												<a
													href="https://www.facebook.com/"
													style="text-decoration: none"
													><img
														src="https://assets.codepen.io/210284/facebook_1.png"
														width="40"
														height="40"
														alt="f"
														style="display: inline-block; color: #cccccc"
												/></a>
												<a
													href="https://www.twitter.com/"
													style="text-decoration: none"
													><img
														src="https://assets.codepen.io/210284/twitter_1.png"
														width="40"
														height="40"
														alt="t"
														style="display: inline-block; color: #cccccc"
												/></a>
											</p>
											<p style="margin: 0; font-size: 14px; line-height: 20px">
												&reg; UpTask MERN 2022<br />Para dejar de recibir correos
												como este,
												<a
													class="unsub"
													href='${config.FRONTEND_URL}'
													style="color: #cccccc; text-decoration: underline"
													>elimina tu suscripción.</a
												>
											</p>
										</td>
									</tr>
								</table>
								<!--[if mso]>
							</td>
							</tr>
							</table>
							<![endif]-->
							</td>
						</tr>
					</table>
				</div>
			</body>
		</html>
		`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

export const sendEmailForgotPassword = (data) => {
	const { email, username, token } = data;

	// Email structure
	const mailOptions = {
		from: '"UpTask - Administrador de Proyectos" <uptaskmern@email.com>',
		to: email,
		subject: 'UpTask - Recupera tu cuenta',
		text: 'Restablece tu contraseña',
		html: `
		<!DOCTYPE html>
		<html
			lang="en"
			xmlns="http://www.w3.org/1999/xhtml"
			xmlns:o="urn:schemas-microsoft-com:office:office"
		>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<meta name="x-apple-disable-message-reformatting" />
				<title></title>
				<!--[if mso]>
					<style>
						table {
							border-collapse: collapse;
							border-spacing: 0;
							border: none;
							margin: 0;
						}
						div,
						td {
							padding: 0;
						}
						div {
							margin: 0 !important;
						}
					</style>
					<noscript>
						<xml>
							<o:OfficeDocumentSettings>
								<o:PixelsPerInch>96</o:PixelsPerInch>
							</o:OfficeDocumentSettings>
						</xml>
					</noscript>
				<![endif]-->
				<style>
					table,
					td,
					div,
					h1,
					p {
						font-family: Arial, sans-serif;
					}
					@media screen and (max-width: 530px) {
						.unsub {
							display: block;
							padding: 8px;
							margin-top: 14px;
							border-radius: 6px;
							background-color: #555555;
							text-decoration: none !important;
							font-weight: bold;
						}
						.col-lge {
							max-width: 100% !important;
						}
					}
					@media screen and (min-width: 531px) {
						.col-sml {
							max-width: 27% !important;
						}
						.col-lge {
							max-width: 73% !important;
						}
					}
				</style>
			</head>
			<body
				style="
					margin: 0;
					padding: 0;
					word-spacing: normal;
					background-color: #D8E3ED;
				"
			>
				<div
					role="article"
					aria-roledescription="email"
					lang="en"
					style="
						text-size-adjust: 100%;
						-webkit-text-size-adjust: 100%;
						-ms-text-size-adjust: 100%;
						background-color: #D8E3ED;
					"
				>
					<table
						role="presentation"
						style="width: 100%; border: none; border-spacing: 0"
					>
						<tr>
							<td align="center" style="padding: 0">
								<!--[if mso]>
							<table role="presentation" align="center" style="width:600px;">
							<tr>
							<td>
							<![endif]-->
								<table
									role="presentation"
									style="
										width: 94%;
										max-width: 600px;
										border: none;
										border-spacing: 0;
										text-align: left;
										font-family: Arial, sans-serif;
										font-size: 16px;
										line-height: 22px;
										color: #363636;
									"
								>
									<tr>
										<td
											style="
												padding: 40px 30px 30px 30px;
												text-align: center;
												font-size: 24px;
												font-weight: bold;
											"
										>
											<a
												href='${config.FRONTEND_URL}'
												target="_blank"
												style="
													text-decoration: none;
													color: #363636;
													display: flex;
													justify-content: center;
													align-items: center;
													gap: 2rem;
												"
												><img
													src="https://raw.githubusercontent.com/jodeperezlo/UPTask_MERN_backend/master/assets/img/uptask.png"
													width="32"
													alt="Logo UpTask MERN"
													style="
														width: 68px;
														max-width: 80%;
														height: auto;
														border: none;
														text-decoration: none;
														color: #ffffff;
													"
												/>UpTask MERN</a
											>
										</td>
									</tr>
									<tr>
										<td style="padding: 30px; background-color: #ffffff">
											<h1
												style="
													margin-top: 0;
													margin-bottom: 16px;
													font-size: 26px;
													line-height: 32px;
													font-weight: bold;
													letter-spacing: -0.02em;
												"
											>
												¡Hola ${username}! 👋
											</h1>
											<h3
												style="
													margin-top: 0;
													margin-bottom: 16px;
													font-size: 20px;
													line-height: 32px;
													font-weight: bold;
													letter-spacing: -0.02em;
												"
											>
												¿Olvidaste tu contraseña?
											</h3>
											<p style="margin: 0">
												Para recuperar tu cuenta es necesario que cambies tu contraseña, de esta manera podrás acceder de nuevo a todos tus proyectos y continuar donde te qudaste.
											</p>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 0;
												font-size: 24px;
												line-height: 28px;
												font-weight: bold;
											"
										>
											<img
												src="https://cdn.pixabay.com/photo/2015/05/28/14/38/ux-787980_960_720.jpg"
												width="600"
												alt=""
												style="
													width: 100%;
													height: auto;
													display: block;
													border: none;
													text-decoration: none;
													color: #363636;
												"
											/>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 35px 30px 11px 30px;
												font-size: 0;
												background-color: #ffffff;
												border-bottom: 1px solid #f0f0f5;
												border-color: rgba(201, 201, 207, 0.35);
											"
										>
											<!--[if mso]>
										<table role="presentation" width="100%">
										<tr>
										<td style="width:145px;" align="left" valign="top">
										<![endif]-->

											<!--[if mso]>
										</td>
										<td style="width:395px;padding-bottom:20px;" valign="top">
										<![endif]-->
											<div
												class="col-lge"
												style="
													display: inline-block;
													width: 100%;
													max-width: 395px;
													vertical-align: top;
													padding-bottom: 20px;
													font-family: Arial, sans-serif;
													font-size: 16px;
													line-height: 22px;
													color: #363636;
												"
											>
												<p style="margin-top: 0; margin-bottom: 12px">
													Para cambiar tu contraseña, por favor, haz click en el
													siguiente enlace:
												</p>
												<p style="margin: 0">
													<a
														href="${config.FRONTEND_URL}/forgot-password/${token}"
														target="_blank"
														style="
															background: #0284c7;
															text-decoration: none;
															padding: 10px 25px;
															color: #ffffff;
															border-radius: 4px;
															display: inline-block;
															mso-padding-alt: 0;
															text-underline-color: #0284c7;
														"
														><!--[if mso
															]><i
																style="
																	letter-spacing: 25px;
																	mso-font-width: -100%;
																	mso-text-raise: 20pt;
																"
																>&nbsp;</i
															><!
														[endif]--><span
															style="mso-text-raise: 10pt; font-weight: bold"
															>Recupera tu cuenta</span
														><!--[if mso
															]><i
																style="letter-spacing: 25px; mso-font-width: -100%"
																>&nbsp;</i
															><!
														[endif]-->
													</a>
												</p>
											</div>
											<!--[if mso]>
										</td>
										</tr>
										</table>
										<![endif]-->
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 30px;
												font-size: 24px;
												line-height: 28px;
												font-weight: bold;
												background-color: #ffffff;
												border-bottom: 1px solid #f0f0f5;
												border-color: rgba(201, 201, 207, 0.35);
											"
										>
											<a
												href='${config.FRONTEND_URL}'
												style="text-decoration: none"
												><img
													src="https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_960_720.jpg"
													width="540"
													alt=""
													style="
														width: 100%;
														height: auto;
														border: none;
														text-decoration: none;
														color: #363636;
													"
											/></a>
										</td>
									</tr>
									<tr>
										<td style="padding: 30px; background-color: #ffffff">
											<p style="margin: 0">
												Si tienes cualquier duda 🤔 puedes contactarte con nosotros,
												estamos disponibles las 24 horas. 🕗
											</p>
											<p style="margin: 0">
												Si tú no solicitaste esta acción, haz caso omiso a este correo. 📧
											</p>
										</td>
									</tr>
									<tr>
										<td
											style="
												padding: 30px;
												text-align: center;
												font-size: 12px;
												background-color: #7890A5;
												color: #cccccc;
											"
										>
											<p style="margin: 0 0 8px 0">
												<a
													href="https://www.facebook.com/"
													style="text-decoration: none"
													><img
														src="https://assets.codepen.io/210284/facebook_1.png"
														width="40"
														height="40"
														alt="f"
														style="display: inline-block; color: #cccccc"
												/></a>
												<a
													href="https://www.twitter.com/"
													style="text-decoration: none"
													><img
														src="https://assets.codepen.io/210284/twitter_1.png"
														width="40"
														height="40"
														alt="t"
														style="display: inline-block; color: #cccccc"
												/></a>
											</p>
											<p style="margin: 0; font-size: 14px; line-height: 20px">
												&reg; UpTask MERN 2022<br />Para dejar de recibir correos
												como este,
												<a
													class="unsub"
													href='${config.FRONTEND_URL}'
													style="color: #cccccc; text-decoration: underline"
													>elimina tu suscripción.</a
												>
											</p>
										</td>
									</tr>
								</table>
								<!--[if mso]>
							</td>
							</tr>
							</table>
							<![endif]-->
							</td>
						</tr>
					</table>
				</div>
			</body>
		</html>
		`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};
