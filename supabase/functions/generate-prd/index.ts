import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are an expert product manager and technical architect. Generate a comprehensive, developer-ready Product Requirements Document (PRD) based on the user's app idea.

Your output MUST be valid JSON matching this exact structure:
{
  "projectSummary": {
    "whatUserWants": "string - clear description of the app concept",
    "targetAudience": "string - who will use this app",
    "targetPlatforms": ["array of platforms like Web, Mobile, PWA"],
    "expectedOutcomes": ["array of 3-4 measurable outcomes"]
  },
  "coreFeatures": [
    {
      "title": "Feature Name",
      "description": "What this feature does",
      "userStory": "As a [user], I want to [action] so that [benefit]",
      "acceptanceCriteria": ["array of 3-5 testable criteria"],
      "uxBehavior": "How the feature should feel and behave",
      "priority": "must" | "should" | "could" | "wont"
    }
  ],
  "systemRequirements": {
    "techStack": ["array of core technologies"],
    "libraries": ["array of recommended packages"],
    "authentication": "string - auth approach",
    "database": "string - database recommendation",
    "deployment": "string - deployment strategy"
  },
  "dataModels": [
    {
      "name": "EntityName",
      "attributes": [
        { "name": "field_name", "type": "data type", "required": true/false, "description": "what this field stores" }
      ],
      "relationships": ["array of related entities"]
    }
  ],
  "userFlow": [
    { "id": "1", "title": "Step Name", "description": "What happens" }
  ],
  "mvpScope": {
    "must": ["critical features for launch"],
    "should": ["important but not critical"],
    "could": ["nice to have"],
    "wont": ["explicitly out of scope for MVP"]
  }
}

Guidelines:
- Generate 4-6 core features with realistic acceptance criteria
- Include 2-4 data models with proper attributes and relationships
- Create a logical 5-7 step user flow
- Be specific about tech recommendations (prefer modern stacks like React, TypeScript, Tailwind)
- Ensure all JSON is valid and properly escaped
- Output ONLY the JSON object, no markdown or explanations`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea, advancedMode } = await req.json();

    if (!idea || typeof idea !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Please provide an app idea' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userPrompt = advancedMode
      ? `Generate a detailed, developer-ready PRD for this app idea. Include comprehensive technical specifications, detailed data models, and thorough acceptance criteria.\n\nApp Idea: ${idea}`
      : `Generate a PRD for this app idea. Focus on core features and essential requirements.\n\nApp Idea: ${idea}`;

    console.log('Generating PRD for idea:', idea.substring(0, 100));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI usage limit reached. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate PRD. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response:', data);
      return new Response(
        JSON.stringify({ error: 'No response from AI. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON from the AI response
    let prdData;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      prdData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError, content);
      return new Response(
        JSON.stringify({ error: 'Failed to parse PRD. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('PRD generated successfully');

    return new Response(
      JSON.stringify({ prd: prdData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-prd function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
