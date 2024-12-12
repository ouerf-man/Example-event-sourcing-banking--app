import { NextResponse, NextRequest } from "next/server";
import { GetAccountBalanceQuery, QueryHandlers } from "@/server/application";
import { EventRepository } from "@/server/infrastructure";

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const accountId = searchParams.get('accountId');
  
      if (!accountId) {
        return NextResponse.json(
          { error: 'Missing accountId in query parameters' },
          { status: 400 }
        );
      }
      const eventRepo = new EventRepository();
      const queryHandlers = new QueryHandlers(eventRepo);
  
      const query: GetAccountBalanceQuery = { accountId };
  
      const balance = await queryHandlers.handleGetAccountBalance(query);
  
      return NextResponse.json({ balance }, { status: 200 });
    } catch (error: unknown) {
      console.error('Error fetching account balance:', JSON.stringify(error));
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }