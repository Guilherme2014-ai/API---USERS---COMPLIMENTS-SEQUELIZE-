# Compliment's API
Esta API tem o Objetivo de criar users e complimentes.

<p>Entre users e compliments ha um relacionamento de 1 PARA M,
Um User Pode Ter Varios Elogios recebidos e Varios Elogios Enviados, assim como as Tags podem ter varios Elogios tambem.</p>


<br>


<h2>Models</h2>
<h3>Compliment's Model</h3>
<ul>
  <li><strong>Message(String)</strong></li>
  <li><strong>user_receiver(Number)</strong> - Foreign Key (Users)</li>
  <li><strong>user_sender(Number)</strong> - Foreign Key (Users)</li>
  <li><strong>tag_id(Number)</strong> - Foreign Key (Tags)</li>
</ul>
<hr>
<h3>User's Model</h3>
<ul>
  <li><strong>Name(String)</strong></li>
  <li><strong>Email(String)</strong> - Foreign Key (Users)</li>
  <li><strong>Password(String)</strong> - Foreign Key (Users)</li>
  <li><strong>Rule(Number)</strong> - Foreign Key (Tags)</li>
</ul>
<hr>
<h3>Tag's Model</h3>
<ul>
  <li><strong>Name(String)</strong></li>
</ul>
