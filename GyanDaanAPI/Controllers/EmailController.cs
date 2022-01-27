using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocketLabs.InjectionApi;
using System.Net.Mail;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Net;

namespace GyanDaanAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : ControllerBase
    {
        [HttpPost("/SendMail")]
        public bool SendMail([FromBody] List<models.sendMailData> sendMailData)
        {
            try
            {
                ////Required Namespaces
                //var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                //var now = DateTime.UtcNow;
                //var apiSecret = "1Za12BxA0VH9eovGAr8QZHxxR9k3trg1OZV9";
                //byte[] symmetricKey = Encoding.ASCII.GetBytes(apiSecret);

                ////Token String for the Authorization Header
                //var tokenDescriptor = new SecurityTokenDescriptor
                //{
                //    Issuer = "WOQ96NQQQN6FlwB5sB7OUQ",
                //    Expires = now.AddSeconds(300),
                //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256),
                //};
                //var token = tokenHandler.CreateToken(tokenDescriptor);
                //var tokenString = tokenHandler.WriteToken(token);

                ////Create Request
                //var client = new RestClient("https://api.zoom.us/v2/users/praveenkumar.suggula0@gmail.com/meetings");
                //var request = new RestRequest(Method.Post.ToString());
                //request.RequestFormat = DataFormat.Json;
                //request.AddJsonBody(new { topic = "Meeting for Gyandaan", duration = "10", start_time = "2022-01-17T05:00:00", type = "2" });
                //request.AddHeader("authorization", String.Format("Bearer {0}", tokenString));

                ////Get Response
                //Task<RestResponse> restResponse = client.ExecuteAsync(request);
                //HttpStatusCode statusCode = restResponse.Result.StatusCode;
                //int numericStatusCode = (int)statusCode;
                //var jObject = JObject.Parse(restResponse.Result.Content);
                ////Host.Text = (string)jObject["start_url"];
                ////Join.Text = (string)jObject["join_url"];
                ////Code.Text = Convert.ToString(numericStatusCode);
                //sendMailData[0].link = (string)jObject["start_url"];

                //Email service
                SocketLabsClient.QuickSend(
                42394, //Your SocketLabs ServerId
                "e8CFk34YmJa9n2E5RoWq", //Your Injection API Key
                sendMailData[0].studentEmail, //The To address for your message
                sendMailData[0].mentorEmail, //The From address for your message
                "Gyan Accepted, Topic: " + sendMailData[0].topic, //The Subject line for your message
                "Dear Student, Your Gyan '" + sendMailData[0].myGyan + "' is accepted by mentor. " +
                "Click on this meeting link to join on time ("
                + sendMailData[0].startTime +"  To  "+ sendMailData[0].endTime + ") : " + sendMailData[0].link
                );
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
