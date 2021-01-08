import Layout from "../../Layout";

export default function NewProduct({}) {
  return (
    <Layout>
      <main>
        <form>
          <label>
            Titel:
            <input type="text" name="title" />
          </label>
          <label>
            Beskrivning av varan:
            <textarea name="description" cols="40" rows="20" />
          </label>
          <label>
            Pris:
            <input type="number" name="price" />
          </label>
          <label>
            Lägg till en bild:
            <input type="file" />
          </label>
          <label>
            <select>
              <option>Här behövs alla kategorier</option>
            </select>
          </label>
          <label>
            Ort där varan finns:
            <input type="text" name="location" />
          </label>
          <label>
            Säljarens mailadress:
            <input type="email" name="email" />
          </label>
        </form>
      </main>
    </Layout>
  );
}
