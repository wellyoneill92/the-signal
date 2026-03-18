import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { firstName, email } = await req.json();

  if (!firstName || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (portalId && formGuid) {
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: firstName },
              { name: 'email', value: email },
            ],
            context: {
              pageUri: req.headers.get('referer') || '',
              pageName: 'The Signal',
            },
          }),
        }
      );

      if (!res.ok) {
        console.error('HubSpot submission failed:', await res.text());
      }
    } catch (err) {
      // Log but don't block — still grant access
      console.error('HubSpot error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
