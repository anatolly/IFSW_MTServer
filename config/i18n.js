/**
 * Internationalization / Localization Settings
 * (sails.config.i18n)
 *
 * If your app will touch people from all over the world, i18n (or internationalization)
 * may be an important part of your international strategy.
 *
 *
 * For more informationom i18n in Sails, check out:
 * http://sailsjs.org/#/documentation/concepts/Internationalization
 *
 * For a complete list of i18n options, see:
 * https://github.com/mashpie/i18n-node#list-of-configuration-options
 *
 *
 */

module.exports.i18n = {

  /***************************************************************************
  *                                                                          *
  * Which locales are supported?                                             *
  *                                                                          *
  ***************************************************************************/

  locales: ['ru', 'en'],

  /****************************************************************************
  *                                                                           *
  * What is the default locale for the site? Note that this setting will be   *
  * overridden for any request that sends an "Accept-Language" header (i.e.   *
  * most browsers), but it's still useful if you need to localize the         *
  * response for requests made by non-browser clients (e.g. cURL).            *
  *                                                                           *
  ****************************************************************************/


  //TODO: “ут надо уточнить, что defaultLocale то не устанавливает locale, поэтому потом в логе полно warnings, то вдруг начал устанавливать и не писать ворнинги
  // ак стал решать проблему ворнингов: —м выше комментарий от авторов - locale вообще устанавливаетс€ в зависимости от Accepted-Language
  //ј еще проблема в том, что (не знаю еще как в view/ejs) i18n есть как метод аж в 3 переменных: sails, req, res.
  //я не уверен до конца, как правильно устанавливать локализацию, поэтому:
  // 1. пробовал в bootstrap сделать sails.setLocale('ru'), но выдало ошибку. “о ли еще sails не сделан, то ли setLocale там нет
  // 2. потом в policy (через нее сначала проход€т все запросы и так рекомендовано в хэлпе) сделал:  req.setLocale(sails.config.i18n.defaultLocale);
  //    и далее в config/policies типа:
  /*
  '*': ['setLocale', 'isAuthenticated'],

  UserController: {
    '*': ['setLocale', 'isAuthenticated'],

    getUsersListToLogin: ['setLocale', true],
    login: ['setLocale', true],

    signup: ['setLocale', true]
  }
  */
  //Ќо потом убрал, т.к. ща и так стало работать без ворнингов

  defaultLocale: 'ru'

  /****************************************************************************
  *                                                                           *
  * Automatically add new keys to locale (translation) files when they are    *
  * encountered during a request?                                             *
  *                                                                           *
  ****************************************************************************/

  // updateFiles: false,

  /****************************************************************************
  *                                                                           *
  * Path (relative to app root) of directory to store locale (translation)    *
  * files in.                                                                 *
  *                                                                           *
  ****************************************************************************/

  // localesDirectory: '/config/locales'

};
