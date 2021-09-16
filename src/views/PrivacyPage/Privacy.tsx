import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => ({
  root: {
    minHeight: 600,
    margin: '60px 0px',
    padding: '35px 0px',
    overflowX: 'hidden',
    background: theme.palette.white,
    [theme.breakpoints.down('sm')]: {
      padding: '50px 0px 30px 0px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '90px 0px',
    }
  },
  header: {
    fontWeight: 400,
  },
  content: {
    color: '#161c2d',
    fontSize: '1.0625rem',
    marginTop: 10,
    fontWeight: 400,
    lineHeight: 1.6
  },
  effective: {
    fontWeight: 300,
    marginTop: 10,
    fontSize: '1.10rem',
    letterSpacing: '.08em',
    lineHeight: 1.55
  },
  title: {
    fontWeight: 400,
    marginTop: 10,
    fontSize: '1.10rem',
    letterSpacing: '.08em',
    lineHeight: 1.55
  }
}));

const Privacy = () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid>
          <Typography
            variant="inherit"
            component="h1"
            className={classes.header}
          >
            SPACrun Website Privacy Policy
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.effective}
          >
            Effective date: 05/18/2021
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            1. Introduction
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Welcome to <b>Adzdata LLC</b>.
            <br />
            Adzdata LLC (“us”, “we”, or “our”) operates http://spacrun.com (hereinafter referred to as <b>“Service”</b>).
            <br />
            Our Privacy Policy governs your visit to http://spacrun.com, and explains how we collect, safeguard and disclose information that results from your use of our Service.
            <br />
            We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
            <br />
            Our Terms and Conditions (<b>“Terms”</b>) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (<b>“agreement”</b>).
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            2. Definitions
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            <b>SERVICE</b> means the http://spacrun.com website operated by Adzdata LLC.
            <br />
            <b>PERSONAL DATA</b> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
            <br />
            <b>USAGE DATA</b> is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).
            <br />
            <b>COOKIES</b> are small files stored on your device (computer or mobile device).
            <br />
            <b>DATA CONTROLLER</b> means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.
            <br />
            <b>DATA PROCESSORS (OR SERVICE PROVIDERS)</b> means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.
            <br />
            <b>DATA SUBJECT</b> is any living individual who is the subject of Personal Data.
            <br />
            <b>THE USER</b> is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            3. Information Collection and Use
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            4. Types of Data Collected
          </Typography>
          <Typography
              variant="inherit"
              component="p"
              className={classes.content}
          >
            <b>Personal Data</b><br />
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (<b>“Personal Data”</b>). Personally identifiable information may include, but is not limited to:
            <ol type="a">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
            </ol>
            We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.
            <br /><br />
            <b>Usage Data</b><br />
            We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device (“Usage Data”).
            <br/><br/>
            This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            <br/><br/>
            When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.
            <br/><br/>
            <b>Tracking Cookies Data</b><br />
            We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.
            <br/><br/>
            Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.
            <br/><br/>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            <br/><br/>
            Examples of Cookies we use:
            <ol type="a">
              <li><b>Session Cookies:</b> We use Session Cookies to operate our Service.</li>
              <li><b>Preference Cookies:</b> We use Preference Cookies to remember your preferences and various settings.</li>
              <li><b>Security Cookies:</b> We use Security Cookies for security purposes.</li>
              <li><b>Advertising Cookies:</b> Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</li>
            </ol>
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            5. Use of Data
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Adzdata LLC uses the collected data for various purposes:
            <ul >
              <li>to provide and maintain our Service;</li>
              <li>to notify you about changes to our Service;</li>
              <li>to allow you to participate in interactive features of our Service when you choose to do so;</li>
              <li>to provide customer support;</li>
              <li>to gather analysis or valuable information so that we can improve our Service;</li>
              <li>to monitor the usage of our Service;</li>
              <li>to detect, prevent and address technical issues;</li>
              <li>to fulfill any other purpose for which you provide it;</li>
              <li>to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</li>
              <li>to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;</li>
              <li>to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;</li>
              <li>in any other way we may describe when you provide the information;</li>
              <li>for any other purpose with your consent.</li>
            </ul>
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            6. Retention of Data
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            <br /><br />
            We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            7. Transfer of Data
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            <br /><br />
            If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
            <br /><br />
            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            <br /><br />
            Adzdata LLC will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            8. Disclosure of Data
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may disclose personal information that we collect, or you provide:
            <ol type="a">
              <li>
                <b>Disclosure for Law Enforcement.</b><br />
                Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.
              </li>
              <li>
                <b>Business Transaction.</b><br />
                If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.
              </li>
              <li>
                <b>Other cases. We may disclose your information also:</b><br />
                <ol type="i">
                  <li>to our subsidiaries and affiliates;</li>
                  <li>to contractors, service providers, and other third parties we use to support our business;</li>
                  <li>to fulfill the purpose for which you provide it;</li>
                  <li>for the purpose of including your company’s logo on our website;</li>
                  <li>for any other purpose disclosed by us when you provide the information;</li>
                  <li>if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.</li>
                </ol>
              </li>
            </ol>
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            9. Security of Data
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR. – See more at https://eur-lex.europa.eu/eli/reg/2016/679/oj
            <br /><br />
            We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
            <br /><br />
            If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at support@spacrun.com.
            <br /><br />
            In certain circumstances, you have the following data protection rights:
            <ol type="a">
              <li>the right to access, update or to delete the information we have on you;</li>
              <li>the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;</li>
              <li>the right to object. You have the right to object to our processing of your Personal Data;</li>
              <li>the right of restriction. You have the right to request that we restrict the processing of your personal information;</li>
              <li>the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format;</li>
              <li>the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information;</li>
            </ol>
            Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not able to provide Service without some necessary data.
            <br /><br />
            You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            11. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law’s reach stretches well beyond California to require a person or company in the United States (and conceivable the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy. – See more at: https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/
            <br /><br />
            According to CalOPPA we agree to the following:
            <ol type="a">
              <li>users can visit our site anonymously;</li>
              <li>our Privacy Policy link includes the word “Privacy”, and can easily be found on the page specified above on the home page of our website;</li>
              <li>users will be notified of any privacy policy changes on our Privacy Policy Page;</li>
              <li>users are able to change their personal information by emailing us at support@spacrun.com.</li>
            </ol>
            Our Policy on “Do Not Track” Signals:
            <br /><br />
            We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.
            <br /><br />
            You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            12. Your Data Protection Rights under the California Consumer Privacy Act (CCPA)
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:
            <ol type="a">
              <li>
                <b>What personal information we have about you</b>. If you make this request, we will return to you:
                <ol type="i">
                  <li>The categories of personal information we have collected about you.</li>
                  <li>The categories of sources from which we collect your personal information.</li>
                  <li>The business or commercial purpose for collecting or selling your personal information.</li>
                  <li>The categories of third parties with whom we share personal information.</li>
                  <li>The specific pieces of personal information we have collected about you.</li>
                  <li>A list of categories of personal information that we have sold, along with the category of any other company we sold it to. If we have not sold your personal information, we will inform you of that fact.</li>
                  <li>A list of categories of personal information that we have disclosed for a business purpose, along with the category of any other company we shared it with.</li>
                </ol>
                Please note, you are entitled to ask us to provide you with this information up to two times in a rolling twelve-month period. When you make this request, the information provided may be limited to the personal information we collected about you in the previous 12 months.
              </li>
              <li>
                <b>To delete your personal information</b>. If you make this request, we will delete the personal information we hold about you as of the date of your request from our records and direct any service providers to do the same. In some cases, deletion may be accomplished through de-identification of the information. If you choose to delete your personal information, you may not be able to use certain functions that require your personal information to operate.
              </li>
              <li>
                <b>To stop selling your personal information</b>. We don't sell or rent your personal information to any third parties for any purpose. You are the only owner of your Personal Data and can request disclosure or deletion at any time.
                <br /><br />
                Please note, if you ask us to delete or stop selling your data, it may impact your experience with us, and you may not be able to participate in certain programs or membership services which require the usage of your personal information to function. But in no circumstances, we will discriminate against you for exercising your rights.
                <br /><br />
                To exercise your California data protection rights described above, please send your request(s) by one of the following means:
                <br /><br />
                By email: support@spacrun.com
                <br /><br />
                By mail: ADZDATA LLC 1267 Willis Street Redding, California 96001
              </li>
            </ol>
            Your data protection rights, described above, are covered by the CCPA, short for the California Consumer Privacy Act. To find out more, visit the official California Legislative Information website. The CCPA took effect on 01/01/2020.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            13. Service Providers
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may employ third party companies and individuals to facilitate our Service (<b>“Service Providers”</b>), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.
            <br /><br />
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            14. Analytics
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may use third-party Service Providers to monitor and analyze the use of our Service.
            <br /><br />
            <b>Google Analytics</b><br />
            Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.
            <br /><br />
            For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: https://policies.google.com/privacy?hl=en
            <br /><br />
            We also encourage you to review the Google's policy for safeguarding your data: https://support.google.com/analytics/answer/6004245.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            15. Advertising
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may use third-party Service Providers to show advertisements to you to help support and maintain our Service.
            <br /><br />
            <b>Google AdSense DoubleClick Cookie</b><br />
            Google, as a third party vendor, uses cookies to serve ads on our Service. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our Service or other websites on the Internet.
            <br /><br />
            You may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the Google Ads Settings web page: http://www.google.com/ads/preferences/
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            16. Behavioral Remarketing
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Adzdata LLC uses remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimise and serve ads based on your past visits to our Service.
            <br /><br />
            <b>Google Ads (AdWords)</b><br />
            Google Ads (AdWords) remarketing service is provided by Google Inc.
            <br /><br />
            You can opt-out of Google Analytics for Display Advertising and customize the Google Display Network ads by visiting the Google Ads Settings page: http://www.google.com/settings/ads
            <br /><br />
            Google also recommends installing the Google Analytics Opt-out Browser Add-on – https://tools.google.com/dlpage/gaoptout – for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics.
            <br /><br />
            For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: https://policies.google.com/privacy?hl=en
            <br /><br />
            <b>Bing Ads Remarketing</b><br />
            Bing Ads remarketing service is provided by Microsoft Inc.
            <br /><br />
            You can opt-out of Bing Ads interest-based ads by following their instructions: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            <br /><br />
            You can learn more about the privacy practices and policies of Microsoft by visiting their Privacy Policy page: https://privacy.microsoft.com/en-us/PrivacyStatement
            <br /><br />
            <b>Twitter</b><br />
            Twitter remarketing service is provided by Twitter Inc.
            <br /><br />
            You can opt-out from Twitter's interest-based ads by following their instructions: https://support.twitter.com/articles/20170405
            <br /><br />
            You can learn more about the privacy practices and policies of Twitter by visiting their Privacy Policy page: https://twitter.com/privacy
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            17. Payments
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).
            <br /><br />
            We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.
            <br /><br />
            The payment processors we work with are:
            <br /><br />
            <b>PayPal or Braintree:</b><br />
            Their Privacy Policy can be viewed at https://www.paypal.com/webapps/mpp/ua/privacy-full
            <br /><br />
            <b>Stripe:</b><br />
            Their Privacy Policy can be viewed at: https://stripe.com/us/privacy
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            18. Links to Other Sites
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            <br /><br />
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            19. Children's Privacy
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Our Services are not intended for use by children under the age of 13 (<b>“Children”</b>).
            <br /><br />
            We do not knowingly collect personally identifiable information from Children under 13. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            20. Changes to This Privacy Policy
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            <br /><br />
            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy.
            <br /><br />
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            21. Contact Us
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            If you have any questions about this Privacy Policy, please contact us:
            <br /><br />
            By email: support@spacrun.com.
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Privacy;
