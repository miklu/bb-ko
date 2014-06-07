# Hyödyllisiä muistiinpanoja

chromessa inspect element = Ctr+SHIFT+C
$0 on viimeksi tutkittu elementti

Sisennettävä

console.group('foo')
console.groupEnd('foo')


vaihda NODEN alustaa

NODE_ENV=production node server.js

## Git

Höydyllisiä branchin nimia ovat esim. develop, hotfix, release

* Lisää ja tallenna kaikki **git commit -am "Message"**
* Lyhennetty historia **git reflog**
* Palauta projekti tiettyyn tilaan **git reset --hard c543cea**
* Tarkasta tietyn tiedoston eroja nykyiseen committiin **git diff c543cea path/to/file**
* Luo uusi branch **git branch uusi_feature**
* Siirry branchiin **git co uusi_feature**
* Liitä branch nykyiseen **git merge uusi_feature**
* Poista branch **git branch -d uusi_feature**
* Lisää edelliseen committiin: **git add .** ja **git commit --amend**

git branch listaa kaikki branchit

git fetch upstream
git merge upstream/master

tai

git pull

* Hakee uusimman version reposta
git pull origin master

* Katso muutokset
git diff HEAD

## NPM
Poista moduulit joita et käytä **npm prune**
Päivit kaikki moduulit **npm update**

## MongoDB

Hae kaikki vedot tietokannasta

```javascript
db.find()
```
Käytä tietokantaa

```javascript
use mydb
```
Lisää tietokantaan

```javascript
db.mydb.insert(muuttuja)
db.mydb.insert({title: 'Testi'})
```
Näytä collectionit

```javascript
show collections
```
Poista tietokanta

```javascript
db.dropDatabase()
```
Poista collection

```javascript
db.mydb.drop()
```
Esimerkki hausta

```javascript
db.users.find( { age: { $gt: 18 } }, { name: 1, address: 1 } ).limit(5)
```
Esimerkki aggregationista

```javascript
db.vedot.aggregate({$match:{pelimuoto: "Pitkäveto"}},
{$group: { _id: "$pelimuoto",total:
{$sum: "$panos"}}})
```