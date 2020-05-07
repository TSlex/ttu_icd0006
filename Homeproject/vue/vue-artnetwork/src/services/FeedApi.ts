import Axios from 'axios';

export abstract class AccountApi {
  private static axios = Axios.create(
    {
      baseURL: "https://localhost:5001/api/v1/feed/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  // static async getRecordCount(): Promise<string | null> {}
  // static async getFeed(pageNUmber: number): Promise<string | null> {}

}
