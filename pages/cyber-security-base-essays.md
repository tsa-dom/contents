<!---
<title>Cyber Security Base school work</title>
<description>Essays written for Cyber Security Base Mooc course</description>
<author>Tapio Salonen</author>
--->
-----
#### These essays are school work for the course Cyber Security Base

[Cyber Security Base](https://cybersecuritybase.mooc.fi/)

-----
##### Essay 1

*"Write an essay in your own words describing possible costs, direct and indirect, that may occur when dealing with cyber security attacks. The essay should be around 250 words."*

There are several types of costs related to cyber attacks. Cyber criminals can for example steal customers data stored to organizations databases. This data can include several identifiable information about a customer and it can be used to create massive economic damage to them.

Ransomwares are examples of cyber attacks where victims are locked up from their device. To unlock compromised data that can contain for example very critical business information needs a decryption key which is provided or not if you pay a ransom. These attacks put victims under the pressure because they usually have only a limited amount of time to decrypt compromised files. This is very destructive if the data stored on the device is very valuable.

If an organization becomes a victim of a large cyber crime it could possibly lead to a lack of trust against that company. The company can lose a lot of its customers which is an indirect result of cyber crime.

Some cyber criminals could target health industries that contain a lot of sensitive personal data about patients. Since that data could contain for example medical reports of the patient it could lead to increased mental health problems among victims or untrust against health care industries. These kinds of costs are hard to measure financially. This could also lead in the long term to increased costs of society's healthcare.

-----
##### Essay 2
*"Watch the videos mentioned above and think about why is cyber security such a big deal today and whose job it actually is to protect you. Write an essay of 200 words reflecting the importance of cyber security and whose job it is."*

Cyber security today is a very huge issue and everyone should take it seriously. Most cyber attack targets are humans and criminals use a lot of ways to manipulate their victims. This is called social engineering. There are various types of cyber attacks but there is one unifying factor and it's that modern cyber criminals are interested in people's personal data. As funny as it sounds there are many cyber criminals that actually don't know much about computers, they are using softwares like normal people developed by other cyber criminals.

Organizations should be aware of how they use their customers' data. Do they really need some specific piece of it and where that data is supposed to store. It's also important that organizations invest in their employees' cyber security skills because it's not obvious that everyone is aware of it.

Knowing at least the basics of cyber security is everyone's responsibility. Everyone should be able to think where they are sending their own data. How they protect their data for example with strong passwords and two-step authentication. Everyone should think twice before clicking anything on their device because many cyber attacks need a victim to click buttons. The more people know about the basics of cyber security it makes it a lot harder for cyber criminals to do their jobs.

-----
##### Essay 3

*"One of the goals for modern malware is to create botnets. Botnet is essentially a (large) set of computers that can be controlled remotely by a hijacker. Write a short essay (250 words) on how botnets can be used for malicious purposes. Provide at least 3 scenarios."*

There are several ways how the hijacker may want to use botnets. One of the reasons is to do a successful DDoS attack against any known organization for any possible reason. The reason for the DDoS attack may be for example an attempt to decrease customers' trust against a specific company. If the botnet is very large and the target of the DDoS attack is for example health care, that can cause a lot of significant damage.

Distribution of crypto miners, malwares and ransomwares might be possible reasons for hijackers to create the botnet. Crypto miners might be used to mine crypto currencies to the hijacker at the cost of the victim’s computing power. Crypto miners can be so sophisticated that they are designed to perform so that they don't disturb the victim. Malwares may be designed to steal victims' sensitive information and to distribute itself to other machines.

Sending spam emails might be one possible reason for hijackers to create botnets. If the botnet consists of a lot of machines it is pretty easy to distribute spam emails to large numbers of victims and their possible contacts.

Cyber criminals might want to create botnets so they can sell them to other cyber criminals. The cyber criminal who buys a botnet may perform its own cyber crimes with it. They can for example steal their victims' sensitive information and perform other crimes.

-----
##### Essay 4

*"Traditionally, routers do not inspect networks packets above transport layer. However, in deep packet inspection a router studies application layer payloads, and makes decisions based on the available information. Write a short essay (250 words) describing at least 2 different scenarios where a deep packet inspection can be used."*

Deep packet inspection may be used to analyze what kind of traffic is coming to a destination. Routers' firewalls might be configured so they are capable of detecting possible malwares or other malicious activity by inspecting the incoming traffic. Defending against DDoS attacks is one of the intended use cases for deep packet inspection. It gives us tools to filter traffic during the DDoS attack by looking into what the package actually contains. Deep package inspection also decreases the possibility of becoming infected by malware, because potential malicious activity is possible to detect before the package actually reaches its destination.

It's possible to use deep package inspection as an intrusion detection system. Illegal requests are possible to distinguish from the legal ones and that gives the possibility to minimize the risk that intruders may compromise for example organization’s servers. Usually deep packet inspection is used to filter traffic which is not otherwise possible on the server side.

Because the deep package inspection is mainly used for filtering it may be used also to prioritise incoming requests. Routers can for example assign priority levels to incoming requests, so the requests with highest priority are on the top of the pile.

Although the deep packet inspection is useful, it contains some downsides like that the network performance may decrease. It also doesn't provide any ultimate protection against threats so other security protections are needed.

-----
##### Essay 5

*"Substitution cipher is a generalization of Caesar cipher, where individual letters are mapped to other letters. This mapping can be almost anything except one should be able to invert it, so that the message can be decrypted. Caesar cipher is a special case of substitution cipher where individual letters are shifted by a fixed amount. Despite having a very large key space, this cipher is not secure, for example, if the language of the original message is known. Explain why. In addition, suggest some simple modification to the substitution cipher so that the attack that you just described no longer works. Note that the new cipher doesn't have to be invulnerable to more sophisticated attacks. Your essay should be around 300 words."*

Let's assume that we know the frequencies of how many times each character is used on average in arbitrary texts. Then assume that we have a substitution cipher encrypted message and the language of the original message is well known. Now we can calculate occurences of each character in the encrypted message and then we can compare the results to the known frequencies. The weakest point in this kind of encryption is that it's pretty easy to deduce which characters in the encrypted message are vowels. Also if the encrypted message is very long it increases the possibility that the message is easily decrypted due to regularities.

One way to improve the substitution cipher is to equalize frequencies of characters. We can for example define that character "a" is substituted for multiple different characters. This approach assumes that there are more available letters options to construct the encrypted message compared to the original one, but the apparent length of the both messages is still the same. This form of encryption is easy to decrypt if you know how letters are mapped, for example letters "e" and "f" could be mapped to the letter "a".

Another way to improve substitution cipher is to use some kind of bijective shuffling function. In addition to substitution cipher we can shuffle the whole encrypted message by using some sort of secret pattern. This combined with my first suggestion to improve the substitution cipher significantly improves the encryption of the original message. It's important to note that the shuffling function has to be bijective because without the existence of the decryptive inverse function there is no way to decrypt the message.