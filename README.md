## Uygulama Dokümantasyonu


Bu proje, bir Express uygulamasında bir MongoDB veritabanına bağlantı kurmayı ve `/orders` endpoint'i üzerinden veri çekmeyi sağlar. 

Bu React uygulaması, belirli bir satıcı adına ait sipariş verilerini çeker ve bunları bir çizgi grafik üzerinde görselleştirir. Ayrıca, gruplandırılmış siparişlerin bir tablo şeklinde listelenmesini sağlar.

### Kullanılan Teknolojiler

Bu uygulamada aşağıdaki teknolojiler kullanılmaktadır:

- React: Front-end geliştirmek için kullanılan bir JavaScript kütüphanesidir.
- axios: HTTP istekleri yapmak için kullanılan bir kütüphanedir.
- react-chartjs-2: React ile uyumlu bir şekilde çizgi grafikleri oluşturmak için kullanılır.
- chart.js: Verileri grafiklere dönüştürmek için kullanılan bir JavaScript kütüphanesidir.

### Nasıl Çalışır?

Uygulama, bir satıcı adını kullanıcı tarafından alır ve bu satıcıya ait sipariş verilerini bir API'dan çeker. API'ye yapılan isteğin sonucunda elde edilen veriler, önce gruplandırılır ve daha sonra bir çizgi grafik üzerinde gösterilir. Aynı zamanda, gruplandırılmış siparişler bir tablo şeklinde listelenir.

#### Fonksiyonlar

Uygulama içinde aşağıdaki fonksiyonlar bulunmaktadır:

- `groupOrders`: Siparişleri ürün kimliği ve satıcı adına göre gruplandırmak için kullanılır.
- `graphOrders`: Siparişleri ay, yıl ve satıcı adına göre gruplandırmak için kullanılır.
- `generateChartData`: Gruplandırılmış sipariş verilerini çizgi grafik veri yapısına dönüştürmek için kullanılır.
- `fetchOrders`: API'ye istek atarak sipariş verilerini almak için kullanılır.
- `handleSubmit`: Satıcı adını girdikten sonra sipariş verilerini almak için kullanılan formu göndermek için kullanılır.

#### Kullanılan Komponentler

Uygulama içinde aşağıdaki komponentler kullanılmaktadır:

- `Line` (react-chartjs-2): Çizgi grafiğini oluşturmak için kullanılır.

### Kurulum ve Çalıştırma

Bu uygulamayı çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Projeyi bilgisayarınıza klonlayın veya zip dosyasını indirip çıkartın.
2. Proje dizinine geçin ve terminal açın.
3. Proje bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın:

   ```
   npm install
   ```

4. Bağımlılıklar yüklendikten sonra uygulamayı başlatmak için aşağıdaki komutu çalıştırın:

   ```
   npm start
   ```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

### Notlar

- Uygulama, `vendorName` değişkenine girilen satıcı adına göre sipariş verilerini alır. Bu değişkeni uygun bir satıcı adıyla değiştirerek farklı bir satıcıya ait siparişleri çekebilirsiniz.
- Sipariş verileri API'den alındıktan sonra tarihlerine göre sıralanır ve gruplandırılır.
- Grafik ve tablo, gruplandırılmış sipariş verilerine dayalı olarak oluşturulur.

### Önkoşullar

- Node.js'in yüklü olduğundan emin olun. [Node.js'i indirin](https://nodejs.org)
- MongoDB'nin yüklü olduğundan emin olun. [MongoDB'yi indirin](https://www.mongodb.com)

### Yükleme

1. Projeyi klonlayın veya ZIP dosyasını indirip çıkarın.

2. Konsolda projenin kök dizinine gidin.

3. Gerekli npm paketlerini yüklemek için aşağıdaki komutu çalıştırın:

   ```shell
   npm install
   ```

4. `.env` adında bir dosya oluşturun ve aşağıdaki değişkenleri tanımlayın:

   ```plaintext
   PORT=3000
   CONNECTION_URL=mongodb://localhost:27017/
   ```

5. MongoDB'nin çalıştığından emin olun.

6. Proje sunucusunu başlatmak için aşağıdaki komutu çalıştırın:

   ```shell
   npm start
   ```

7. Tarayıcınızda `http://localhost:3000` adresine giderek projeye erişebilirsiniz.
```

3. **API Dokümantasyonu**: Projenin API endpointleri:

```markdown
## API Dokümantasyonu

### `/orders` Endpoint'i

GET `/orders` endpoint'i, sipariş verilerini getirir. İsteğe bağlı olarak `vendorName` adında bir query parametresi alır.

Örnek istek:

```
GET /orders?vendorName=Acme+Corp
```

Yukarıdaki örnekte, sadece `Acme Corp` adındaki satıcıya ait siparişler getirilir.

#### Örnek Yanıt

İsteğe göre filtrelenmiş bir yanıt örneği:

```json
[
  {
    "product_id": "123",
    "item_count": 5,
    "parent_product_name": "Product XYZ",
    "vendor_name": "Acme Corp",
    "payment_at": "2021-07-01T12:00:00Z",
    "year": 2021,
    "month": 7
  },
  ...
]
```
```






