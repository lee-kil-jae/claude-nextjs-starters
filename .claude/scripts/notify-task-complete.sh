#!/bin/bash

# .env.local 파일에서 환경변수 로드
if [ -f "$CLAUDE_PROJECT_DIR/.env.local" ]; then
  export $(grep -v '^#' "$CLAUDE_PROJECT_DIR/.env.local" | xargs)
else
  echo "Error: .env.local 파일을 찾을 수 없습니다." >&2
  exit 1
fi

# Slack Webhook URL 확인
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "Error: SLACK_WEBHOOK_URL 환경변수가 설정되지 않았습니다." >&2
  exit 1
fi

# 프로젝트 정보
PROJECT_NAME=$(basename "$CLAUDE_PROJECT_DIR")
PROJECT_PATH="$CLAUDE_PROJECT_DIR"

# 타임스탬프 (한국 시간)
TIMESTAMP=$(TZ='Asia/Seoul' date '+%Y-%m-%d %H:%M:%S')

# Slack 메시지 전송
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d @- <<EOF
{
  "text": "✅ Claude Code 작업 완료",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*✅ Claude Code 작업 완료*\n\n*프로젝트:* \`$PROJECT_NAME\`\n*경로:* \`$PROJECT_PATH\`\n*시간:* $TIMESTAMP\n\n작업이 완료되었습니다."
      }
    }
  ]
}
EOF
