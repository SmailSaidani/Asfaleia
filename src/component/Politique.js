import { makeStyles } from '@material-ui/core';
import React from 'react'
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const useStyles = makeStyles((theme)=> ({
    right:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        },
    },
}));


export default function Plt() {

return(
    <div style={{padding : '5%',width : '80%', marginLeft: '10%', backgroundColor: 'white', border : '1px solid black'}}>
    <Typography variant='h2'>Privacy Policy</Typography>
    <Typography variant="subtitle1" style={{color : 'blue'}}>Last updated: September 21, 2022</Typography>
    <Typography variant="body">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Typography>
    <Typography variant="body">We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy    .</Typography>
    
    
    
    
    <Typography variant="h3">Interpretation and Definitions</Typography>
    <Typography variant="body1" style={{color : 'blue'}}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Typography>
    <Typography variant="h5" style={{color : 'red'}}>Definitions</Typography>
    <Typography variant="subtitle2" style={{color : 'blue'}}>For the purposes of this Privacy Policy:</Typography>
    <Typography variant="body1"><Typography variant="overline">Account</Typography> means a unique account created for You to access our Service or parts of our Service.</Typography>
    <Typography variant="body1"><Typography variant="overline">Affiliate</Typography> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Typography>
    <Typography variant="body1"><Typography variant="overline">Company</Typography> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Asfaleia.</Typography>
    <Typography variant="body1"><Typography variant="overline">Country</Typography> refers to:  Algeria</Typography>
    <Typography variant="body1"><Typography variant="overline">Device</Typography> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Typography>
    <Typography variant="body1"><Typography variant="overline">Personal Data</Typography> is any information that relates to an identified or identifiable individual.</Typography>
    <Typography variant="body1"><Typography variant="overline">Service Provider</Typography> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Typography>
    <Typography variant="body1"><Typography variant="overline">You</Typography> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Typography>
     



     <Typography variant="h2">Collecting and Using Your Personal Data</Typography>
     <Typography variant="h4">Types of Data Collected</Typography>
      <Typography varaint="subtitle1">Personal Data</Typography>




      <Typography variant="body1">
      <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
    <ul>
        <li>
        <p>Email address</p>
        </li>
        <li>
        <p>First name and last name</p>
        </li>
        <li>
        <p>Phone number</p>
        </li>
        <li>
        <p>Usage Data</p>
        </li>
    </ul>
      </Typography>

      <Typography variant="body1">
      <h3>Usage Data</h3>
        <br></br>
        <br></br>
        <p>Usage Data is collected automatically when using the Service.</p>
        <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
        <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
        <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>


      </Typography>



      <Typography variant="body1">
      <h2 className='PoliSTit'>Use of Your Personal Data</h2>
<p>The Company may use Personal Data for the following purposes:</p>
<ul>
    <li>
    <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
    </li>
    <li>
    <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
    </li>
    <li>
    <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
    </li>
    <li>
    <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
    </li>
    <li>
    <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
    </li>
    <li>
    <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
    </li>
    <li>
    <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
    </li>
    <li>
    <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
    </li>
        </ul>
        <br></br>
        <br></br>
        <p>We may share Your personal information in the following situations:</p>
        <ul>
            <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
            <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
            <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
            <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
            <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
            <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
        </ul>
      </Typography>



      <Typography variant='body1'>
      <h2 className='PoliSTit'>Retention of Your Personal Data</h2>
        <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
        <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
        <br></br>
        <br></br>


      </Typography>




      <Typography variant='body1'>
      <h2 className='PoliSTit'>Transfer of Your Personal Data</h2>
        <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
        <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
        <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
        <br></br>
        <br></br>


      </Typography>




      <Typography variant='body1'>
      <h2 className='PoliSTit'>Delete Your Personal Data</h2>
        <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
        <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
        <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
        <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
        <br></br>
        <br></br>


      </Typography>

      <Typography variant='body1'>
      <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
    <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

      </Typography>
      <Typography variant='h3'>Contact Us</Typography>
       <Typography variant="body1">

       <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul>
            <li>By email: asfaleiaveh@gmail.com</li>
        </ul>
       </Typography>

       <FormGroup style={{marginLeft : '40%'}}>
      <FormControlLabel control={<Checkbox  />} label="j'ai lu et accepte les conditions" />
    </FormGroup>
    </div>
)

}