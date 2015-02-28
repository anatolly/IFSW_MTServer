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


  //TODO: ��� ���� ��������, ��� defaultLocale �� �� ������������� locale, ������� ����� � ���� ����� warnings, �� ����� ����� ������������� � �� ������ ��������
  //��� ���� ������ �������� ���������: �� ���� ����������� �� ������� - locale ������ ��������������� � ����������� �� Accepted-Language
  //� ��� �������� � ���, ��� (�� ���� ��� ��� � view/ejs) i18n ���� ��� ����� �� � 3 ����������: sails, req, res.
  //� �� ������ �� �����, ��� ��������� ������������� �����������, �������:
  // 1. �������� � bootstrap ������� sails.setLocale('ru'), �� ������ ������. �� �� ��� sails �� ������, �� �� setLocale ��� ���
  // 2. ����� � policy (����� ��� ������� �������� ��� ������� � ��� ������������� � �����) ������:  req.setLocale(sails.config.i18n.defaultLocale);
  //    � ����� � config/policies ����:
  /*
  '*': ['setLocale', 'isAuthenticated'],

  UserController: {
    '*': ['setLocale', 'isAuthenticated'],

    getUsersListToLogin: ['setLocale', true],
    login: ['setLocale', true],

    signup: ['setLocale', true]
  }
  */
  //�� ����� �����, �.�. �� � ��� ����� �������� ��� ���������

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
